// This files tests the following process:
// UILogin -> Create a blog -> Update the blog -> Delete the blog

// https://github.com/fkhadra/react-toastify/issues/292
// https://stackoverflow.com/questions/55046835/select-react-select-dropdown-list-option-using-cypress
// https://glebbahmutov.com/blog/form-validation-in-cypress/
// https://stackoverflow.com/questions/66646336/how-to-access-redux-store-in-cypress-if-the-application-is-running-outside-of-cy
// https://www.cypress.io/blog/2022/01/19/uploading-files-with-selectfile/
// Note: Stubbing with Cypress https://dev.to/dawsoncodes/how-to-use-stub-with-cypress-24he
const dropzone = "[data-cy=file-input]";
const editBtn = "[data-cy=edit-btn]";
const fileInputImg = "[data-cy=file-input-image]";
const status = "[data-cy=blog-status]";
const visibility = "[data-cy=blog-visibility]";
const deleteBlog = "[data-cy=delete-blog]";

describe("Creating a Blog", () => {
  context("User must be logged in", () => {
    it("should be logged in", () => {
      cy.visit("http://localhost:3000/blog/create");
      // should be redirected to login page if not logged in
      cy.url().should("include", "/login");
      cy.checkToastMessage(
        "authError",
        "You need to be logged in to access this page"
      );
    });
  });

  context("Create, Edit and Delete a Blog", () => {
    it("should create a blog", () => {
      // Note: UI Logging before running test is not good practice
      cy.UILogin(Cypress.env("email"), Cypress.env("password"));
      cy.visit("http://localhost:3000/blog/create");
      cy.wait(1000);
      cy.initialReduxState();
      cy.get("#publish").click();

      cy.get("input:invalid").should("be.visible");
      cy.get("[data-cy=blog-title]").type("Cypress Blog");
      cy.get("#publish").click();
      cy.get("textarea:invalid").should("be.visible");
      cy.get("#description").type("This is my first blog");
      cy.get("#publish").click();
      cy.checkToastMessage(
        "featuredImageRequired",
        "Featured Image is required"
      );
      // drag and drop an image to the dropzone
      cy.get(dropzone).selectFile("cypress/fixtures/image.jpg", {
        action: "drag-drop",
      });
      cy.get("#react-select-branch").type("General{enter}{enter}");
      cy.get(".grid > .flex > .react-tagsinput > span > .react-tagsinput-input")
        .click()
        .type("tag1{enter}tag2{enter}tag3{enter}");
      // pass {multiple: true} to select multiple files
      cy.get(".sun-editor-editable")
        .click()
        .type("This is the content of the blog");
      cy.pause(); // to add other content in the editor
      cy.get("#publish").click();
      //  intercept post request sent to the image server
      cy.intercept(
        "POST",
        `${Cypress.env("imageServerUrl")}/imagev2api/profile-upload-single`
      ).as("uploadImage");
      cy.wait("@uploadImage").then((interception) => {
        expect(interception.response?.statusCode).to.equal(200);
        expect(interception.response?.body.result[0].url).to.include(
          "image.jpg"
        );
        expect(interception.response?.body.result[0].name).to.include(
          "image.jpg"
        );
        expect(interception.response?.body.result[0].size).to.be.greaterThan(0);
      });

      // intercept the browser request and make sure we're sending the right data
      cy.intercept("POST", `${Cypress.env("apiUrl")}/api/v1/blogs`).as(
        "createBlog"
      );
      cy.wait("@createBlog").then((interception) => {
        expect(interception.request.headers).to.have.property("authorization");
        const { body } = interception.request;
        expect(body).to.have.all.keys(
          "title",
          "description",
          "content",
          "featuredImage",
          "branch",
          "semester",
          "subject",
          "tags",
          "draft",
          "anonymous"
        );
        expect(body.title).to.equal("Cypress Blog");
        expect(body.description).to.equal("This is my first blog");
        expect(body.featuredImage).to.include("image.jpg");
        expect(body.branch.value).to.equal("general");
        expect(body.branch.label).to.equal("General");
        expect(body.semester.value).to.equal("");
        expect(body.semester.label).to.equal("");
        expect(body.subject.value).to.equal("");
        expect(body.subject.label).to.equal("");
        expect(body.tags).to.deep.equal(["tag1", "tag2", "tag3"]);
        expect(body.draft).to.equal(false);
        expect(body.anonymous).to.equal(false);
        // check whether we're getting the right response
        expect(interception.response?.statusCode).to.equal(201);
      });
      // There shouldn't be any request to the image server here..
      // cy.wait("@uploadImage").should("not.exist");
      cy.checkToastMessage(
        "blogCreated",
        "Blog created successfully. We'll notify you through email once it is published on the website."
      );
      // redirect to the blog page after successful creation
      cy.url().should("include", "/blog/");
      cy.get(editBtn).should("be.visible");
      cy.get(editBtn).click();
      //* Edit the blog 
      // intercept the browser request and make sure we're getting the right data
      cy.intercept("GET", `${Cypress.env("apiUrl")}/api/v1/blogs/slug/*`).as("getBlog");
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
        expect(blog.title).to.equal("Cypress Blog");
        expect(blog.description).to.equal("This is my first blog");
        expect(blog.featuredImage).to.include("image.jpg");
        expect(blog.branch.value).to.equal("general");
        expect(blog.branch.label).to.equal("General");
        expect(blog.semester.value).to.equal("");
        expect(blog.semester.label).to.equal("");
        expect(blog.subject.value).to.equal("");
        expect(blog.subject.label).to.equal("");
        expect(blog.tags).to.deep.equal(["tag1", "tag2", "tag3"]);
        expect(blog.content).to.include("This is the content of the blog");
        expect(blog.draft).to.equal(false);
        expect(blog.anonymous).to.equal(false);
        expect(blog.reviewed).to.equal(false);
      });

      cy.url().should("include", "/blog/edit/");
      cy.get("[data-cy=blog-title]").should("have.value", "Cypress Blog");
      cy.get("#description").should("have.value", "This is my first blog");
      cy.get(fileInputImg)
        .should("have.attr", "src")
        .should("include", "image.jpg");
      // Todo: check if the branch is correct
      // cy.get('#react-select-branch').should("have.value", "General");
      // Todo: check if the tags are correct
      // cy.get('.grid > .flex > .react-tagsinput > span > .react-tagsinput-input').should("have.value", "tag1, tag2, tag3");
      // Todo: check if the content is correct
      // cy.get(".sun-editor-editable").should(
      //   "have.value",
      //   "This is the content of the blog"
      // );
      // check whether the redux state is correct
      cy.window()
        .its("store")
        .invoke("getState")
        // only get post state and check only the status key in the state
        .its("post")
        .its("status")
        .should("deep.equal", {
          reviewed: false,
          draft: false,
          anonymous: false,
        });
      // cy.get(status).should("have.text").should("include", "Under Review");
      // cy.get(visibility).should("have.text").should("include", "Private");

      //* Start making changes to the blog
      cy.get("[data-cy=blog-title]").clear().type("Cypress Blog Edited");
      cy.get("#description").clear().type("This is my first blog edited");
      cy.get(dropzone).selectFile("cypress/fixtures/image2.jpg", {
        action: "drag-drop",
      });
      cy.get("#react-select-branch").type("Sports{enter}{enter}");
      cy.get(".grid > .flex > .react-tagsinput > span > .react-tagsinput-input")
        .click()
        .type("tag4{enter}tag5{enter}tag6{enter}");
      cy.get(".sun-editor-editable")
        .click()
        .type("This is the content of the blog edited");
      cy.get("#update").click();
      // Note: Since we've change the featuredImage we should intercept the image server response
      //* PATCH Request 
      // | Step 1: Delete the old image from the server
      // intercept this request http://localhost:5001/delete-file?filePath=632461d1416122fc5212c05b-29-10-2022-17-13-56-image.jpg
      cy.intercept("DELETE", "http://localhost:5001/delete-file?filePath=*").as("deleteImage");
      cy.wait("@deleteImage").then((interception) => {
        expect(interception.request.url).to.include("image.jpg");
        expect(interception.response?.statusCode).to.equal(200);
        expect(interception.response?.body).to.equal(
          "File deleted successfully."
        );
      });
      // Turn off spying on /imagev2api/profile-upload-single route
      // | Step 2: Upload the new image to the server
      cy.wait("@uploadImage").then((interception) => {
        expect(interception.response?.body.result[0].url).to.include(
          "image2.jpg"
        );
        expect(interception.response?.body.result[0].name).to.include(
          "image2.jpg"
        );
        expect(interception.response?.body.result[0].size).to.be.greaterThan(0);
      });
      // | Step 3: Update the blog
      // intercept the PATCH request and make sure we're sending the right data to the server
      cy.intercept("PATCH", `${Cypress.env("apiUrl")}/api/v1/blogs/*`).as("patchBlog");
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
        expect(blog.featuredImage).to.include("image2.jpg");
        expect(blog.branch.value).to.equal("sports");
        expect(blog.branch.label).to.equal("Sports");
        expect(blog.semester.value).to.equal("");
        expect(blog.semester.label).to.equal("");
        expect(blog.subject.value).to.equal("");
        expect(blog.subject.label).to.equal("");
        expect(blog.tags).to.deep.equal([
          "tag1",
          "tag2",
          "tag3",
          "tag4",
          "tag5",
          "tag6",
        ]);
        expect(blog.content).to.include(
          "This is the content of the blog edited"
        );
        expect(blog.draft).to.equal(false);
        expect(blog.anonymous).to.equal(false);
      });
      cy.checkToastMessage("blogUpdated", "Blog updated successfully");

      cy.url().should("include", "/blog/");
      cy.wait(2000);
      cy.get(editBtn).should("be.visible");
      cy.get(editBtn).click();
      // should be redirected to the edit page
      cy.url().should("include", "/blog/edit/");
      // click delete button
      cy.get("#delete").click();
      // This should make delete button visible
      cy.get(deleteBlog).should("be.visible");
      // click delete button
      cy.get(deleteBlog).click();
      // intercept the DELETE request to the image server and make sure we're deleting the previous image
      cy.wait("@deleteImage").then((interception) => {
        expect(interception.request.url).to.include("image2.jpg");
        expect(interception.response?.statusCode).to.equal(200);
        expect(interception.response?.body).to.equal(
          "File deleted successfully."
        );
      });
      cy.intercept("DELETE", `${Cypress.env("apiUrl")}/api/v1/blogs/*`).as(
        "deleteBlog"
      );
      cy.wait("@deleteBlog").then((interception) => {
        expect(interception.response?.statusCode).to.equal(201);
      });
      // redirect to /user/my-profile
      cy.url().should("include", "/user/my-profile");
      cy.checkToastMessage("blogDeleted", "Blog deleted successfully");
    });
  });
});

// https://stackoverflow.com/questions/66765452/intercept-the-same-api-call-multiple-times-in-cypress

export {};

