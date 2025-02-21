import { ICategoryRepository } from "../interface/catelogRepository.interface";

export class CatelogService {
  private _repository: ICategoryRepository;

  constructor(repository: ICategoryRepository) {
    this._repository = repository;
  }

  async createProduct(input: any) {
    const product = await this._repository.create(input);
    if (!product.id) {
      throw new Error("unable to create product");
    }
    return product;
  }

  async updateProduct(input: any) {
    const data = await this._repository.update(input);
    //  emit event to update record in elasticsearch
    return data;
  }

  // insted of this we will get products from elasticsearch
  async fetchProducts(limit: number, offset: number) {
    const products = await this._repository.find(limit, offset);
    return products;
  }

  async getProduct(id: number) {
    const product = await this._repository.findOne(id);
    return product;
  }
  async deleteProduct(id: number) {
    const result = await this._repository.delete(id);
    return result;
  }
}
