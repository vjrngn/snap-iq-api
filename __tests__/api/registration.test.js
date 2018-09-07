const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User");
const mongoose = require("mongoose");

describe("user registration", () => {
  afterAll(done => {
    mongoose.connection.db.dropDatabase().then(err => {
      mongoose.connection.close();
      done();
    });
  });

  test("it registers a new user", done => {
    request(app)
      .post("/auth/register")
      .send({
        email: "john@example.com",
        password: "12345",
        confirmation: "12345",
      })
      .then(response => response.body)
      .then(body => {
        expect(body.success).toBe(true);
        User.find({ email: "john@example.com" }, (err, users) => {
          expect(users.length).toBe(1);

          done();
        });
      });
  });
});
