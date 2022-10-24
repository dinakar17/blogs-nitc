describe("Login", function () {
  it("Login successful", function () {
    // cy.viewport(1536, 746);

    cy.visit("http://localhost:3000/auth/login");
    
    cy.get(".grid > .flex > .flex > .flex > .border").type(
      "dinakar_b190904ee@nitc.ac.in"
    );

    cy.get(".flex > .flex > .flex > .relative > .w-full").type("12345678");

    cy.get(".flex > .flex > .relative > .absolute > .h-6:nth-child(1)").click();

    cy.get(".flex > .relative > .absolute > .h-6:nth-child(2) > path").click();

    cy.get("div > .grid > .flex > .flex > .bg-blue-500").click();
  });
});
