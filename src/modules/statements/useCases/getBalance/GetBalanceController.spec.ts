import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../../../app";

import CreateConnection from "../../../../database";

let connection: Connection;

describe("Get Balance Controller", () => {
  beforeEach(async () => {
    connection = await CreateConnection;
  });

  it("should be able to create a new user", async () => {
    const response = await request(app).post("/api/v1/users").send({
      name: "Vitor Rafael",
      email: "vitor.silva158@gmail.com",
      password: "1234567",
    });

    expect(response.status).toBe(201);
  });

  it("should be able to get user balances", async () => {
    const response = await request(app).post("/api/v1/sessions").send({
      email: "vitor.silva158@gmail.com",
      password: "1234567",
    });

    const balanceResponse = await request(app)
      .get("/api/v1/statements/balance")
      .set({
        Authorization: `Bearer ${response.body.token}`,
      });

    expect(balanceResponse.body.balance).toBeDefined();
  });

  afterAll(async () => {
    await connection.close();
  });
});
