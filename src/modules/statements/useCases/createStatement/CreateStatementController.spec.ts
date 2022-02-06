import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../../../app";

import CreateConnection from "../../../../database";

let connection: Connection;

describe("Create Statament Controller", () => {
  beforeEach(async () => {
    connection = await CreateConnection;
  });

  it("should be able to create a new user", async () => {
    const response = await request(app).post("/api/v1/users").send({
      name: "Vitor Rafael",
      email: "vitor.silva1578@gmail.com",
      password: "1234567",
    });

    expect(response.status).toBe(201);
  });

  it("should be able to login and create a deposit", async () => {
    const response = await request(app).post("/api/v1/sessions").send({
      email: "vitor.silva1578@gmail.com",
      password: "1234567",
    });

    const depositResponse = await request(app)
      .post("/api/v1/statements/deposit")
      .send({
        amount: 570,
        description: "Recibo de salário",
      })
      .set({
        Authorization: `Bearer ${response.body.token}`,
      });

    expect(depositResponse.status).toBe(201);
  });

  it("should be able to login and make a withdraw", async () => {
    const response = await request(app).post("/api/v1/sessions").send({
      email: "vitor.silva1578@gmail.com",
      password: "1234567",
    });

    const widthdrawResponse = await request(app)
      .post("/api/v1/statements/withdraw")
      .set({
        Authorization: `Bearer ${response.body.token}`,
      })
      .send({
        amount: 320,
        description: "Saque de dinheiro para feira",
      });

    expect(widthdrawResponse.status).toBe(201);
  });

  afterAll(async () => {
    await connection.close();
  });
});
