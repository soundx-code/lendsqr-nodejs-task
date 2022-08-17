const app = require("../server");
const request = require("supertest");

let token;
beforeAll(async () => {
  await request(app).post("/api/register").send({
    first_name: "Thomas",
    last_name: "Balogun",
    phone_number: "07051953939",
    password: "123456",
  });

  const response = await request(app).post("/api/login").send({
    phone_number: "07051953939",
    password: "123456",
  });
  token = response.body.token;
});

describe("User", () => {
  it("should register a user without error message", async () => {
    const response = await request(app).post("/api/register").send({
      first_name: "Abubakar",
      last_name: "Sani",
      phone_number: "09038533232",
      password: "123456",
    });
    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual("Registration successful!");
  });

  it("should return validation error if required input are not filled when registering", async () => {
    const response = await request(app).post("/api/register").send({
      first_name: "",
      last_name: "",
      phone_number: "",
      password: "",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('errors')
  });

  it("should login a user without error message", async () => {
    const response = await request(app).post("/api/login").send({
      phone_number: "09038533232",
      password: "123456",
    });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.message).toEqual("Logged in successfully!");
  });

  it("should return validation error if required input are not filled during login", async () => {
    const response = await request(app).post("/api/login").send({
      phone_number: "",
      password: "",
    });
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('errors')
  });

  it("should return error for invalid login details", async () => {
    const response = await request(app).post("/api/login").send({
      phone_number: "08050029292",
      password: "12345",
    });
    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toEqual("Invalid phone_number or password");
  });
});
