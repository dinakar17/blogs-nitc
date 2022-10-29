// This file executes the test cases for the login page

// https://docs.cypress.io/guides/references/best-practices
// https://github.com/cypress-io/cypress-realworld-app/tree/develop/cypress/tests
// https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test

const emailSelector = "[data-cy=login-email]";
const passwordSelector = "[data-cy=login-password]";
const loginButtonSelector = "[data-cy=login-submit]";
const emailError = "[data-cy=login-email-error]";

const emailValue = Cypress.env("email");
const passwordValue = Cypress.env("password");

const clientUrl = Cypress.env("clientUrl");

// check wether the page is loaded
describe("Login page is Loaded", () => {
  it("should load the login page", () => {
    cy.visit(`${clientUrl}/auth/login`);
    cy.get(emailSelector).should("be.visible");
    cy.get(passwordSelector).should("be.visible");
    cy.get(loginButtonSelector).should("be.visible");
  });
});

describe("Login", function () {
  it("Login successful", function () {
    cy.get(loginButtonSelector).should("be.disabled");

    const regex = new RegExp(/^([a-zA-Z0-9_\-\.]+)@nitc\.ac\.in$/);

    // as the email is typed, the error message should be shown if the email is invalid and hidden if the email is valid
    cy.get(emailSelector)
      .type(emailValue)
      .should("have.value", emailValue)
      .then(($input: any) => {
        if (regex.test($input.val())) {
          cy.get(emailError).should("not.be.visible");
        } else {
          cy.get(emailError).should("be.visible");
        }
      });

    cy.get(passwordSelector).type(passwordValue);

    cy.get(emailError).then(($input) => {
      const emailErrorText = $input.text();
      if (emailErrorText === "") {
        cy.get(loginButtonSelector).should("be.enabled").click();

        cy.url().should("eq", `${clientUrl}/`);
      } else {
        cy.get(loginButtonSelector).should("be.disabled");
      }
    });
  });
});

export {};
