// _app.tsx is the root component of the application. It wraps all the pages and components of the application. It is a good place to add global styles and other global components.

import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { ThemeProvider } from "next-themes";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { store } from "../store/store";

import Head from "next/head";

// Todo: https://stackoverflow.com/questions/66914855/next-js-opt-out-of-layout-component-for-specific-pages-from-app-js

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Reference to the below lines: https://github.com/quilljs/quill/issues/2554 */}
      {/* <Head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0-alpha1/katex.min.css" integrity="sha384-8QOKbPtTFvh/lMY0qPVbXj9hDh+v8US0pD//FcoYFst2lCIf0BmT58+Heqj0IGyx" crossOrigin="anonymous"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0-alpha1/katex.min.js" integrity="sha384-GR8SEkOO1rBN/jnOcQDFcFmwXAevSLx7/Io9Ps1rkxWp983ZIuUGfxivlF/5f5eJ" crossOrigin="anonymous"></script>
    </Head> */}
      {/* Including the attribute="class" is very important, since this tells the library to use the Tailwind dark theme class. */}
      <Provider store={store}>
        <ThemeProvider attribute="class">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
