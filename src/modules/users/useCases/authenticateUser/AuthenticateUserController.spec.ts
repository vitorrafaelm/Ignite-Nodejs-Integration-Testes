import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../../../app";

import CreateConnection from "../../../../database";

let connection: Connection;

describe("Authenticate User Controller", () => {
  beforeEach(async () => {
    connection = await CreateConnection;
  });

  it("should be able to create a new user", async () => {
    const response = await request(app).post("/api/v1/users").send({
      name: "Vitor Rafael",
      email: "vitor.rafaeldeveloper@gmail.com",
      password: "1234567",
    });

    expect(response.status).toBe(201);
  });

  it("should be able to authenticate a new user", async () => {
    const response = await request(app).post("/api/v1/sessions").send({
      email: "vitor.rafaeldeveloper@gmail.com",
      password: "1234567",
    });

    expect(response.body.token).toBeDefined();
  });

  afterAll(async () => {
    await connection.close();
  });
});
