import "../styles/globals.css";
import "katex/dist/katex.min.css";
import "react-toastify/dist/ReactToastify.css";

// https://stackoverflow.com/questions/53012355/how-to-delay-splashscreen-of-redux-persist-gate
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import NextProgress from "next-progress";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Slide, ToastContainer } from "react-toastify";
// Ref: https://www.npmjs.com/package/next-progress  https://dev.to/vvo/show-a-top-progress-bar-on-fetch-and-router-events-in-next-js-4df3

import { store, persistor } from "../store/store";

import Layout from "../components/HOC/Layout/Layout";
import PrivateRoute from "../components/HOC/WithAuth";
import Loader from "../components/UI/Loader/Loader";
import Analytics from "../components/analytics";


// https://stackoverflow.com/questions/66914855/next-js-opt-out-of-layout-component-for-specific-pages-from-app-js
function MyApp({ Component, pageProps }: AppProps) {
  const protectedRoutes = [
    "/user/edit-profile",
    "/user/my-profile",
    "/blog/edit/[slug]",
    "/blog/create",
  ];

  const noLayoutRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/confirmSignup/[token]",
    "/auth/resetPassword/[token]",
    "/auth/forgotPassword",
    "/auth/resendSignupEmail",
  ];

  return (
    <>

      {/* https://medium.com/47billion/loading-spinner-is-one-of-the-most-used-progress-indicators-in-the-user-interface-design-650839fe4040 */}
      <Provider store={store}>
        <PersistGate
          loading={<Loader />}
          persistor={persistor}
          onBeforeLift={() =>
            new Promise((resolve) => setTimeout(resolve, 300))
          }
        >
          <PrivateRoute protectedRoutes={protectedRoutes}>
            {/* Including the attribute="class" is very important, since this tells the library to use the Tailwind dark theme class. */}
            <ThemeProvider attribute="class">
            <Analytics />
              {/* Ref for ThemeProvider is in Google docs */}
              <Layout noLayoutRoutes={noLayoutRoutes}>
                <NextProgress
                  delay={200}
                  color="#29D"
                  options={{ showSpinner: false }}
                />
                <Component {...pageProps} />
                <ToastContainer
                  limit={3}
                  transition={Slide}
                  position="top-center"
                  autoClose={4000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  style={{ fontFamily: "Inter" }}
                />
              </Layout>
            </ThemeProvider>
          </PrivateRoute>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;

// Todo: https://mui.com/material-ui/guides/interoperability/#tailwind-css
// Note: https://github.com/mui/material-ui/issues/10857
