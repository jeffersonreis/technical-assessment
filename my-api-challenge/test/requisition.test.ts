import request from "supertest";
import app from "../src/app";
import { RequisitionInstance } from "../src/requisition/model";

describe("test create a requisition user", () => {
  const userRequest = {
    userId: "1",
    name: "Joaquim",
  };

  test("Should have key record and status code 201", async () => {
    const mockCreateRequisition = jest.fn((): any => userRequest);
    jest.spyOn(RequisitionInstance, "create").mockImplementation(() => mockCreateRequisition());

    const res = await request(app).post("/api/update").send(userRequest);

    expect(mockCreateRequisition).toHaveBeenCalledTimes(1);
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("record");
  });

  test("Should handle exception", async () => {
    const mockCreateRequisition = jest.fn((): any => {
      throw "error";
    });
    jest.spyOn(RequisitionInstance, "create").mockImplementation(() => mockCreateRequisition());

    const res = await request(app).post("/api/update").send(userRequest);

    expect(mockCreateRequisition).toHaveBeenCalledTimes(1);

    expect(res.status).toEqual(500);
  });
});
