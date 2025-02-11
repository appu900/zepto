import { ICategoryRepository } from "../interface/catelogRepository.interface";

export class CatelogService {
 
 private _repository:ICategoryRepository

 constructor(repository:ICategoryRepository){
    this._repository = repository;
 }

  async createProduct(input: any) {
     const product = await this._repository.create(input)
     return product;
  }
  updateProduct(input: any) {}
  fetchProducts(limit: number, offset: number) {}
  getProduct(id: number) {}
  deleteProduct(id: number) {}

}
