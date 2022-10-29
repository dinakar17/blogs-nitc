// This files tests the following process:
// UILogin -> Edit the Blog -> Check if the blog is edited

// Note: Before running this spec, blog with "blog-data.json" should be created
// // should be logged in
describe("Logged in or not", () => {
  it("should be logged in", () => {
    cy.visit(`${Cypress.env("clientUrl")}/blog/edit/dinakar's-blog-2`);
    // redirect to login page
    cy.url().should("eq", `${Cypress.env("clientUrl")}/auth/login`);
    cy.checkToastMessage(
      "authError",
      "You need to be logged in to access this page"
    );
  });
});

describe("Editing the blog", () => {
  context("edit testing", () => {
    it("should edit", () => {
      // Todo: Instead of UI Login, use the API login
      cy.UILogin(Cypress.env("email"), Cypress.env("password"));
      cy.visit(
        `${Cypress.env("clientUrl")}/blog/edit/blog-for-testing-23688efca476`
      );
      cy.intercept("GET", `${Cypress.env("apiUrl")}/api/v1/blogs/slug/*`).as(
        "getBlog"
      );
      cy.wait("@getBlog").then((interception) => {
        const blog = interception.response?.body.data;
        expect(blog).to.have.all.keys(
          "branch",
          "semester",
          "subject",
          "_id",
          "title",
          "description",
          "featuredImage",
          "tags",
          "tagsString",
          "content",
          "likes",
          "user",
          "draft",
          "reviewed",
          "anonymous",
          "createdAt",
          "updatedAt",
          "slug",
          "__v",
          "id"
        );
      });
    // Note: Only works if we've created a blog with the same details
    //   cy.window()
    //     .its("store")
    //     .invoke("getState")
    //     .then((state) => {
    //       cy.fixture("blog-data.json").then((blog) => {
    //         expect(state.post.title).to.equal(blog.title);
    //         expect(state.post.description).to.equal(blog.description);
    //         expect(state.post.featuredImageURL).to.equal(blog.featuredImage);
    //         expect(state.post.featuredImage).to.equal(null);
    //         expect(state.post.tags).to.deep.equal(blog.tags);
    //         expect(state.post.content).to.be.a("string").and.not.to.be.empty;
    //         expect(state.post.status.draft).to.equal(blog.status.draft);
    //         expect(state.post.status.anonymous).to.equal(blog.status.anonymous);
    //         expect(state.post.status.reviewed).to.equal(blog.status.reviewed);

    //         expect(state.filter.branch).to.deep.equal(blog.branch);
    //         expect(state.filter.semester).to.deep.equal(blog.semester);
    //         expect(state.filter.subject).to.deep.equal(blog.subject);
    //       });
    //     });
      cy.get("[data-cy=blog-title]").clear().type("Cypress Blog Edited");
      cy.get("#description").clear().type("This is my first blog edited");
      //   cy.get(dropzone).selectFile("cypress/fixtures/image2.jpg", {
      //     action: "drag-drop",
      //   });
      cy.get("#react-select-branch").type("Sports{enter}{enter}");
      cy.get(".grid > .flex > .react-tagsinput > span > .react-tagsinput-input")
        .click()
        .type("tag4{enter}tag5{enter}tag6{enter}");
      cy.get(".sun-editor-editable")
        .click()
        .type("This is the content of the blog edited");
      cy.pause();
      cy.get("#update").click();
      cy.intercept("DELETE", "http://localhost:5001/delete-file?filePath=*").as(
        "deleteImage"
      );
      cy.intercept(
        "POST",
        `${Cypress.env("imageServerUrl")}/imagev2api/profile-upload-single`
      ).as("uploadImage");
      // https://stackoverflow.com/questions/73710961/test-that-an-api-call-does-not-happen-in-cypress
      // cy.wait("@deleteImage").should("not.exist");
      // Todo: make sure we don't have deleteImage and uploadImage calls
      // cy.wait(@dleeteImage) should throw an error. Check if it does
      // cy.wait("@uploadImage").should("not.exist");
      cy.intercept("PATCH", `${Cypress.env("apiUrl")}/api/v1/blogs/*`).as(
        "patchBlog"
      );
      cy.wait("@patchBlog").then((interception) => {
        const blog = interception.request.body;
        expect(blog).to.have.all.keys(
          "title",
          "description",
          "featuredImage",
          "branch",
          "semester",
          "subject",
          "tags",
          "content",
          "draft",
          "anonymous"
        );
        expect(blog.title).to.equal("Cypress Blog Edited");
        expect(blog.description).to.equal("This is my first blog edited");
        expect(blog.featuredImage).to.be.a("string").and.not.to.be.empty;
        expect(blog.branch.value).to.equal("sports");
        expect(blog.branch.label).to.equal("Sports");
        expect(blog.semester.value).to.equal("");
        expect(blog.semester.label).to.equal("");
        expect(blog.subject.value).to.equal("");
        expect(blog.subject.label).to.equal("");
        expect(blog.tags)
          .to.include("tag4")
          .and.include("tag5")
          .and.include("tag6");
        expect(blog.content).to.include(
          "This is the content of the blog edited"
        );
        expect(blog.draft).to.equal(false);
        expect(blog.anonymous).to.equal(false);
      });
      cy.checkToastMessage("blogUpdated", "Blog updated successfully");

      cy.url().should("include", "/blog/");
    });
  });
});

// Todo: Check 403 error when another user tries to edit the blog and check 404 error when the blog doesn't exist
// Todo: Try setting the blog status to draft and anonymous and check if the blog is saved as draft and anonymous

// Note: The difference between describe and context is that describe is used to group tests and context is used to group assertions.
// If one "describe" block contains multiple "it" blocks, then it is a good idea to use "context" to group the assertions.
// If one "describe" block contains only one "it" block, then it is a good idea to use "describe" to group the assertions.
// If one "describe" block fails it won't affect the other "describe" blocks. But if one "context" block fails it will affect the other "context" blocks.

export {};
