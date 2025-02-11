import request from "supertest";
import express from "express";
import { faker } from "@faker-js/faker";
import catelogRoutes, { catalogService } from "../catelog.routes";
import { ProductFactory } from "../../utils/fixtures";

const app = express();
app.use(express.json());
app.use(catelogRoutes);

const mockRequest = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 10, max: 1000 }),
    price: +faker.commerce.price(),
  };
};

describe("Catelog Routes", () => {
  describe("POST /products", () => {
    test("should create product successfully", async () => {
      const requestBody = mockRequest();
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() => Promise.resolve(product));
      const response = await request(app)
        .post("/products")
        .send(requestBody)
        .set("Accept", "application/json");
      console.log("TEST RESPONSE", response);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(product);
    });

    // test("should response with validation error 400", async () => {
    //   const requestBody = mockRequest();
    //   const response = await request(app)
    //     .post("/products")
    //     .send({...requestBody,name:""})
    //     .set("Accept", "application/json");
    //   console.log("TEST RESPONSE", response);
    //   expect(response.status).toBe(400);
    //   expect(response.body).toEqual("name should not be empty");
    // });
  });
});
