describe("Authentication", () => {
  context("Login", () => {
    it("should login with valid credentials", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/auth/login",
        body: {
          email: "",
          password: "",
        },
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.eq(
          "Please provide email and password"
        );
      });
    });

    it("User does not exist", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/auth/login",
        body: {
          email: "dinakar17@gmail.com",
          password: "123456",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.eq(
          "User doesn't exist. Please signup to continue"
        );
      });
    });

    it("Incorrect password", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/auth/login",
        body: {
          email: Cypress.env("email"),
          password: Cypress.env("password"),
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.eq("Incorrect password");
      });
    });
    // Todo: User is not verified
    it("Successfull login", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:3000/api/auth/login",
        body: {
          email: Cypress.env("email"),
          password: Cypress.env("password"),
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq("success");
        expect(response.body.token).to.be.a("string");
        // check in data: {user} all the keys are present in the user object
        expect(response.body.data.user).to.have.all.keys(
          "bio",
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
    });
  });

});

export {};
