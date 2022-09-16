// _app.tsx is the root component of the application. It wraps all the pages and components of the application. It is a good place to add global styles and other global components.

import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/HOC/Layout/Layout";
import { ThemeProvider } from "next-themes";
import "react-toastify/dist/ReactToastify.css";
// Ref: https://www.npmjs.com/package/next-progress  https://dev.to/vvo/show-a-top-progress-bar-on-fetch-and-router-events-in-next-js-4df3
import NextProgress from "next-progress";

import { Provider } from "react-redux";
import { store } from "../store/store";

import Head from "next/head";
import PrivateRoute from "../components/HOC/WithAuth";
import "katex/dist/katex.min.css";
import { ToastContainer } from "react-toastify";
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
// Todo: https://stackoverflow.com/questions/66914855/next-js-opt-out-of-layout-component-for-specific-pages-from-app-js

// | Step 6: Import persistStore to persist the store
const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  // const { authData, token } = useSelector((state: RootState) => state.user);

  const protectedRoutes = [
    "/user/myBlogs",
    "/user/myProfile",
    "/blog/edit/[slug]",
    "/blog/create",
  ];

  const noLayoutRoutes = ["/auth/login", "/auth/signup"];
  return (
    <>
      {/* Reference to the below lines: https://github.com/quilljs/quill/issues/2554 */}
      {/* <Head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0-alpha1/katex.min.css" integrity="sha384-8QOKbPtTFvh/lMY0qPVbXj9hDh+v8US0pD//FcoYFst2lCIf0BmT58+Heqj0IGyx" crossOrigin="anonymous"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0-alpha1/katex.min.js" integrity="sha384-GR8SEkOO1rBN/jnOcQDFcFmwXAevSLx7/Io9Ps1rkxWp983ZIuUGfxivlF/5f5eJ" crossOrigin="anonymous"></script>
    </Head> */}
      {/* Including the attribute="class" is very important, since this tells the library to use the Tailwind dark theme class. */}
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="Web app for blogging application Blog App"
        />
      </Head>

      {/* https://medium.com/47billion/loading-spinner-is-one-of-the-most-used-progress-indicators-in-the-user-interface-design-650839fe4040 */}
      <NextProgress delay={200} color="#29D" options={{ showSpinner: false }} />
      <Provider store={store}>
      <PersistGate loading={<div> Loading... </div>} persistor={persistor}>
          <PrivateRoute protectedRoutes={protectedRoutes}>
            <ThemeProvider attribute="class">
              {/* Ref for ThemeProvider is in Google docs */}
              <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <Layout noLayoutRoutes={noLayoutRoutes}>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </PrivateRoute>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
