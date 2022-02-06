import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../../../app";

import CreateConnection from "../../../../database";

let connection: Connection;

describe("Show user profile Controller", () => {
  beforeEach(async () => {
    connection = await CreateConnection;
  });

  it("should be able to create a new user", async () => {
    const response = await request(app).post("/api/v1/users").send({
      name: "Vitor Rafael",
      email: "vitor.silva@gmail.com",
      password: "1234567",
    });

    expect(response.status).toBe(201);
  });

  it("should be able to get user informations", async () => {
    const response = await request(app).post("/api/v1/sessions").send({
      email: "vitor.silva@gmail.com",
      password: "1234567",
    });

    const profileResponse = await request(app).get("/api/v1/profile").set({
        "Authorization": `Bearer ${response.body.token}`
    });

    expect(profileResponse.body).toBeDefined();
  });

  afterAll(async () => {
    await connection.close();
  });
});
