import { ICategoryRepository } from "../../interface/catelogRepository.interface"
import { MockCatelogRepository } from "../../repository/mockCatelog.repository";
import { CatelogService } from "../catelog.service";
import { faker} from "@faker-js/faker"

const mockProduct = () =>{
  return {
    name:faker.commerce.productName(),
    description:faker.commerce.productDescription(),
    price:+faker.commerce.price(),
    stock:faker.number.int({min:10,max:1000})
  }
}

describe("catelogService",()=>{

 let repository:ICategoryRepository

   beforeEach(()=>{
       repository = new MockCatelogRepository(); //
   })

   afterEach(()=>{
       repository = {} as MockCatelogRepository
   })

   describe("createProduct",()=>{
      test("should create a product",async()=>{
          const service = new CatelogService(repository);
          const requestBody = mockProduct()
          const result = await service.createProduct(requestBody);
          expect(result).toMatchObject({
            id:expect.any(Number),
            name:expect.any(String),
            description:expect.any(String),
            price:expect.any(Number),
            stock:expect.any(Number),
          })
      })

      test("should throw en error with product already exixts",()=>{

      })
   })

})