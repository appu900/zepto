import { ICategoryRepository } from "../../interface/catelogRepository.interface";
import { Product } from "../../models/product.model";
import { MockCatelogRepository } from "../../repository/mockCatelog.repository";
import { CatelogService } from "../catelog.service";
import { faker } from "@faker-js/faker";
import { Factory } from "rosie";

const productFactory = new Factory<Product>()
  .attr("id", faker.number.int({ min: 1, max: 100 }))
  .attr("name", faker.commerce.productName())
  .attr("description", faker.commerce.productDescription())
  .attr("price", +faker.commerce.price());

const mockProduct = (rest: any) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 10, max: 1000 }),
    ...rest,
  };
};

describe("catelogService", () => {
  let repository: ICategoryRepository;

  beforeEach(() => {
    repository = new MockCatelogRepository(); //
  });

  afterEach(() => {
    repository = {} as MockCatelogRepository;
  });

  describe("createProduct", () => {
    test("should create a product", async () => {
      const service = new CatelogService(repository);
      const requestBody = mockProduct({
        price: +faker.commerce.price(),
      });
      const result = await service.createProduct(requestBody);
      expect(result).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });

    test("should throw en error with unable to create product", async () => {
      const service = new CatelogService(repository);
      const requestBody = mockProduct({
        price: +faker.commerce.price(),
      });
      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() => Promise.resolve({} as Product));
      await expect(service.createProduct(requestBody)).rejects.toThrow(
        "unable to create product"
      );
    });

    test("should throw en error with Product Already exists", async () => {
      const service = new CatelogService(repository);
      const requestBody = mockProduct({
        price: +faker.commerce.price(),
      });
      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("Product already exists"))
        );
      await expect(service.createProduct(requestBody)).rejects.toThrow(
        "Product already exists"
      );
    });
  });

  describe("updateProduct", () => {
    test("should update a product", async () => {
      const service = new CatelogService(repository);
      const requestBody = mockProduct({
        price: +faker.commerce.price(),
        id: faker.number.int({ min: 1, max: 100 }),
      });
      const result = await service.updateProduct(requestBody);
      expect(result).toMatchObject(requestBody);
    });

    test("should throw an error with product does not exist", async () => {
      const service = new CatelogService(repository);
      const requestBody = mockProduct({
        price: +faker.commerce.price(),
        id: faker.number.int({ min: 1, max: 100 }),
      });
      jest
        .spyOn(repository, "update")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("Product does not exist"))
        );
      await expect(service.updateProduct({})).rejects.toThrow(
        "Product does not exist"
      );
    });
  });

  describe("getProducts", () => {
    test("should get products by offset and limit", async () => {
      const service = new CatelogService(repository);
      const randomLimit = faker.number.int({ min: 1, max: 100 });
      const mockProducts = productFactory.buildList(randomLimit)
      jest.spyOn(repository,'find').mockImplementationOnce(() => Promise.resolve(mockProducts));
      const result = await service.fetchProducts(randomLimit, 0);
      console.log(result);
      expect(result.length).toEqual(randomLimit);
      expect(result).toMatchObject(mockProducts);
    });


    test("should throw en error with Products doesnot exists", async () => {
      const service = new CatelogService(repository);
      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("Products does not exists"))
        );
      await expect(service.fetchProducts(0,0)).rejects.toThrow(
        "Products does not exists"
      );
    });
  });

  describe("getProduct", () => {
    test("should get product by id", async () => {
      const service = new CatelogService(repository);
      const product = productFactory.build()
      jest.spyOn(repository,'findOne').mockImplementationOnce(() => Promise.resolve(product));
      const result = await service.getProduct(product.id!);
      console.log(result);
      expect(result).toMatchObject(product);
    });
  })

  // describe("deleteProduct",()=>{
  //   test("should delete product by id",async()=>{
  //     const service = new CatelogService(repository);
  //     const product = productFactory.build()
  //     jest.spyOn(repository,'delete').mockImplementationOnce(() => Promise.resolve({
  //       id:product.id
  //     }));
  //     const result = await service.deleteProduct(product.id!);
  //     expect(result).toEqual({
  //       id:product.id
  //     });
  //   })
  // })
});
