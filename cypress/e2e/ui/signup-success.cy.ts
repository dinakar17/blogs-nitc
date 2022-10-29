// Note: We need to add signupToken manually before running this test case.

describe("signup-success", () => {
  it("should display the signup success page", () => {
    cy.visit(
      `${Cypress.env("clientUrl")}/auth/confirmSignup/${Cypress.env(
        "signupToken"
      )}`
    );
    // should redirect to login page
    cy.url().should("include", "/auth/login");
    // should display the success message though toast
    cy.checkToastMessage(
      "emailConfirmationSuccess",
      "Hurray! Email Confirmation Successful 😊. Please Login to continue"
    );
  });
});

export {};
