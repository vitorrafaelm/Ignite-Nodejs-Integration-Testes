import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../../../app";

import CreateConnection from "../../../../database";

let connection: Connection;

describe("Create User Controller", () => {
  beforeEach(async () => {
    connection = await CreateConnection;
  });

  it("should be able to create a new user", async () => {
    const response = await request(app).post("/api/v1/users").send({
      name: "Vitor",
      email: "vitor.rafael1518@gmail.com",
      password: "1234567",
    });

    expect(response.status).toBe(201);
  });

  afterAll(async () => {
    await connection.close();
  });
});
