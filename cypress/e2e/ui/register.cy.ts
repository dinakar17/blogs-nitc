// This file executes the test cases for the register page

const emailSelector = 'input[name="email"]';
const userNameSelector = 'input[name="userName"]';
const passwordSelector = 'input[name="password"]';
const confirmPasswordSelector = 'input[name="confirmPassword"]';
const emailErrorSelector = "[data-cy=signUp-emailError]";
const passwordErrorSelector = "[data-cy=signUp-passwordError]";
const confirmPasswordErrorSelector = "[data-cy=signUp-confirmPasswordError]";
const submitSelector = "[data-cy=signUp-submit]";

const email = "[data-cy=success-email]";
const msg = "[data-cy=success-msg]";

const EMAIL = "doondisandeep_b191255bt@nitc.ac.in";

describe("Registering a new user", () => {
  it("should register a new user", () => {
    cy.visit(`${Cypress.env("clientUrl")}/auth/signup`);
    cy.get(submitSelector).click();
    cy.get("input:invalid").should("have.length", 4);
    cy.get(userNameSelector).type("test user");
    cy.get(submitSelector).click();
    cy.get("input:invalid").should("have.length", 3);
    cy.get(emailSelector).type("dinakar17@gmail.com");
    cy.get(emailErrorSelector).should("be.visible");
    cy.get(emailSelector).clear().type(EMAIL);
    cy.get(emailErrorSelector).should("not.be.visible");
    cy.get(submitSelector).click();
    cy.get("input:invalid").should("have.length", 2);
    cy.get(passwordSelector).type("123456");
    cy.get(passwordErrorSelector).should("be.visible");
    cy.get(passwordSelector).clear().type("123456789");
    cy.get(passwordErrorSelector).should("not.be.visible");
    cy.get(confirmPasswordSelector).type("123456");
    cy.get(confirmPasswordErrorSelector).should("be.visible");
    cy.get(confirmPasswordSelector).clear().type("123456789");
    cy.get(confirmPasswordErrorSelector).should("not.be.visible");
    // Note: Here the assumption is that a new user is signing up
    cy.get(submitSelector).click();
    cy.wait(2000); // reflects the server response time
    cy.get(email).should("have.text", EMAIL);
    cy.get(msg).should("have.text", "Thanks for signing up!");
  });
});

// Todo: Test Signup Success

export {};
