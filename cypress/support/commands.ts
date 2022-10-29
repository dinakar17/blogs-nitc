/// <reference types="cypress" />
import { signIn } from "../../store/StatesContainer/auth/AuthSlice";
import "cypress-localstorage-commands";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

// https://www.cypress.io/blog/2018/11/14/testing-redux-store/

Cypress.Commands.add("checkToastMessage", (toastId, message) => {
  cy.get(`[id=${toastId}]`).should("contain", message);
});

// const dispatch = (action: any) => {
//   cy.window().its("store").invoke("dispatch", action);
// };

Cypress.Commands.add("login", (email, password) => {
  cy.request("POST", "http://localhost:5000/api/v1/users/login", {
    email: email,
    password: password,
  })
    .its("body")
    .then((body) => cy.setLocalStorage("token", body.token));
});

const emailSelector = "[data-cy=login-email]";
const passwordSelector = "[data-cy=login-password]";
const loginButtonSelector = "[data-cy=login-submit]";

Cypress.Commands.add("UILogin", (email, password) => {
  cy.visit("http://localhost:3000/auth/login");
  cy.get(emailSelector).type(email);
  cy.get(passwordSelector).type(password);
  cy.get(loginButtonSelector).click();
  // This sends a request to the server to login. Intercepting this browser request and server response using cy.intercept()
  cy.intercept("POST", `${Cypress.env("apiUrl")}/api/v1/users/login`).as(
    "loginRequest"
  );
  cy.wait("@loginRequest").then((interception) => {
    // make sure we're sending the email and password to the server
    expect(interception.request.body).to.deep.equal({
      email: email,
      password: password,
    });
    expect(interception.response?.statusCode).to.equal(200);
    expect(interception.response?.body).to.have.property("token");
    expect(interception.response?.body).to.have.property("data");
    expect(interception.response?.body.data.user).to.have.all.keys(
      "_id",
      "createdAt",
      "email",
      "name",
      "passwordChangedAt",
      "photo",
      "updatedAt",
      "__v",
      "_id"
    );
  });
  cy.wait(5000);
  cy.url().should("deep.equal", "http://localhost:3000/");

  // check if the redux store is updated i.e., authData and token should not be null anymore
  cy.window()
    .its("store")
    .invoke("getState")
    // get a particular slice of the state
    .its("user")
    // check whether authData is of type object and token is of type string
    .should(
      "have.all.keys",
      "authData",
      "token",
      "signUpSuccess",
      "error",
      "_persist",
      "loading"
    )
    .and("have.property", "authData")
    // check whether authData has the properties bio, createdAt, email, name, passwordChangedAt, photo, updatedAt, _v, _id
    .and("have.all.keys", [
      "bio",
      "createdAt",
      "email",
      "name",
      "passwordChangedAt",
      "photo",
      "updatedAt",
      "__v",
      "_id",
    ]);

  cy.window()
    .its("store")
    .invoke("getState")
    .its("user")
    .should("have.property", "token")
    .and("be.a", "string")
    .and("not.to.be.empty");
});

Cypress.Commands.add("initialReduxState", () => {
  cy.window()
    .its("store")
    .invoke("getState")
    .its("filter")
    .should("deep.equal", {
      branch: { value: "", label: "" },
      semester: { value: "", label: "" },
      subject: { value: "", label: "" },
    });

  cy.window()
    .its("store")
    .invoke("getState")
    .its("post")
    .should("deep.equal", {
      title: "",
      description: "",
      featuredImage: null,
      featuredImageURL: "",
      tags: [],
      content: "",
      status: {
        reviewed: false,
        draft: false,
        anonymous: false,
      },
    });
});

declare global {
  namespace Cypress {
    interface Chainable {
      //   login(email: string, password: string): Chainable<void>
      //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
      checkToastMessage(toastId: string, message: string): Chainable<Element>;
      login(email: string, password: string): Chainable<Element>;
      UILogin(email: string, password: string): Chainable<Element>;
      initialReduxState(): Chainable<Element>;
    }
  }
}

export {};
