import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'ui2v82',
  e2e: {
    // baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    apiUrl: "http://localhost:5000",
    clientUrl: "http://localhost:3000",
    imageServerUrl: "http://localhost:5001",
    email: process.env.EMAIL_FOR_TEST,
    password: process.env.PASSWORD_FOR_TEST,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
