// Todo: Test backend API with Cypress
// https://stackoverflow.com/questions/70892317/how-to-store-the-response-of-a-request-in-cypress
// https://stackoverflow.com/questions/21418580/what-is-the-difference-between-before-and-beforeeach
const apiUrl = Cypress.env("apiUrl");

describe("Blog API", () => {
  context("GET /api/v1/blogs", () => {
    it("should return blogs", () => {
      cy.request("GET", `${apiUrl}/api/v1/blogs`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("data")
        expect(response.body.data).to.be.an("array").length.greaterThan(0);
        expect(response.body.data[0]).to.have.all.keys(
          "_id",
          "title",
          "description",
          "featuredImage",
          "tags",
          "likes",
          "user",
          "anonymous",
          "createdAt",
          "updatedAt",
          "slug",
          "id"
        );
        expect(response.body).to.have.property("currentPage");
        expect(response.body).to.have.property("numberOfPages");
        expect(response.body).to.have.property("totalBlogs");
        expect(response.body).to.have.property("currentBlogsCount");
      });
    });
  });

  context("GET blog by slug", () => {
    it("should return a blog", () => {
      cy.request(
        "GET",
        `${apiUrl}/api/v1/blogs/slug/i-am-going-test-my-drastic-changes`
      ).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.be.an("object");
        expect(response.body.data).to.have.all.keys(
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
        expect(response.body).to.have.property("relatedBlogs");
        expect(response.body.relatedBlogs)
          .to.be.an("array")
          .length.greaterThan(0);
        expect(response.body.relatedBlogs[0]).to.have.all.keys(
          "_id",
          "title",
          "featuredImage",
          "user",
          "createdAt",
          "slug",
          "anonymous",
          "id"
        );
      });
    });
  });

  context("GET latest blogs", () => {
    it("should return latest blogs", () => {
      cy.request("GET", `${apiUrl}/api/v1/blogs/latest`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.be.an("array").length(7);
        expect(response.body.data[0]).to.have.all.keys(
          "_id",
          "title",
          "description",
          "featuredImage",
          "tags",
          "likes",
          "user",
          "anonymous",
          "createdAt",
          "updatedAt",
          "slug",
          "id"
        );
      });
    });
  });

  context("GET random blogs", () => {
    it("should return random blogs", () => {
      cy.request("GET", `${apiUrl}/api/v1/blogs/random`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.be.an("array").length(4);
        expect(response.body.data[0]).to.have.all.keys(
          "_id",
          "title",
          "featuredImage",
          "user",
          "anonymous",
          "slug"
        );
      });
    });
  });

  before(() => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  context("POST PATCH DELETE /api/v1/blogs", () => {
    it("should create a blog", function () {
      // // set token
      // cy.request("POST", `${apiUrl}/api/v1/users/login`, {
      //   email: Cypress.env("email"),
      //   password: Cypress.env("password"),
      // })
      //   .its("body.token")
      //   .as("token");

      // convert @token to string
      cy.request({
        method: "POST",
        url: `${apiUrl}/api/v1/blogs`,
        headers: {
          // ? cy.window().getLocalStorage("token") returning [object Object] instead of token
          //* Use .then(token => token) to get the token
          // getLocalStorage("token") fetches the token from local storage
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: {
          title: "alksdfljk Test Blog",
          description: "Test Blog Description",
          featuredImage: "https://picsum.photos/200",
          branch: {
            value: "cse",
            label: "Computer Science and Engineering",
          },
          semester: {
            value: "1",
            label: "1st Semester",
          },
          subject: {
            value: "maths",
            label: "Mathematics",
          },
          tags: ["test", "blog"],
          content: "Test Blog Content",
          draft: false,
          anonymous: false,
        },
      })
        .then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.have.property("data");
          expect(response.body.data).to.be.an("object");
          expect(response.body.data).to.have.all.keys(
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
          return response.body.data._id;
        })
        .as("blogId");
    });

    it("should update a blog", function () {
      cy.request({
        method: "PATCH",
        url: `${apiUrl}/api/v1/blogs/${this.blogId}`,
        body: {
          title: "Test Blog Updated",
          description: "Test Blog Description Updated",
          featuredImage: "https://picsum.photos/200",
          branch: {
            value: "cse",
            label: "Computer Science and Engineering",
          },
          semester: {
            value: "1",
            label: "1st Semester",
          },
          subject: {
            value: "maths",
            label: "Mathematics",
          },
          tags: ["test", "blog"],
          content: "Test Blog Content Updated",
          draft: false,
          anonymous: false,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.be.an("object");
        expect(response.body.data).to.have.all.keys(
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
    });

    it("should delete a blog", function () {
      cy.request({
        method: "DELETE",
        url: `${apiUrl}/api/v1/blogs/${this.blogId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
  });
});

// Note: if you want to use an alias in a test, you need to use the function form of the .as() command. The arrow function form will not work.
// Note: You can only access the alias in the same test(its). If you want to access it in different tests then use beforeEach() and afterEach() hooks.

export {};
