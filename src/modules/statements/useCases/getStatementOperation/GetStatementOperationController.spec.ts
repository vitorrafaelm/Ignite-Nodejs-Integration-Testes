import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../../../app";

import CreateConnection from "../../../../database";

let connection: Connection;

describe("Get Statament Operation Controller", () => {
  beforeEach(async () => {
    connection = await CreateConnection;
  });

  it("should be able to create a new user", async () => {
    const response = await request(app).post("/api/v1/users").send({
      name: "Vitor Rafael",
      email: "vitor.silva15789@gmail.com",
      password: "1234567",
    });

    expect(response.status).toBe(201);
  });

  it("should be able to login and get a statement by id", async () => {
    const response = await request(app).post("/api/v1/sessions").send({
      email: "vitor.silva15789@gmail.com",
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

    const statementResponse = await request(app)
      .get(`/api/v1/statements/${depositResponse.body.id}`)
      .send({
        amount: 570,
        description: "Recibo de salário",
      })
      .set({
        Authorization: `Bearer ${response.body.token}`,
      });

    expect(statementResponse.body).toBeDefined();
  });

  afterAll(async () => {
    await connection.close();
  });
});
