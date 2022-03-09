"use strict";
const server = require("../src/server");
const supertest = require("supertest");
const request = supertest(server.app);
const { db } = require("../src/models/index");

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe("test API server ", () => {
  it("testing /", async () => {
    const response = await request.get("/");
    expect(response.text).toEqual("Home");
    expect(response.status).toEqual(200);
  });
  it("test bad route", async () => {
    const response = await request.get("/badroute");
    expect(response.status).toEqual(404);
  });
  it("test bad method", async () => {
    const response = await request.put("/");
    expect(response.status).toEqual(404);
  });
});

describe("test auth signin & signup server ", () => {
  it("test signup", async () => {
    const response = await request.post("/signup").send({
      username: "roz",
      password: "1234",
    });
    expect(response.status).toEqual(201);
  });
  it("test signup", async () => {
    const response = await request.post("/signin").auth('roz','1234');
    expect(response.status).toEqual(200);
  });
  it("test signup wrong password", async () => {
    const response = await request.post("/signin").auth('roz','12345');
    expect(response.status).toEqual(401);
  });
  it("test signup wrong user", async () => {
    const response = await request.post("/signin").auth('rozzz','1234');
    expect(response.status).toEqual(401);
  });
});


