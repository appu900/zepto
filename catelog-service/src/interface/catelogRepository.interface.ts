import { Product } from "../models/product.model";

export interface ICategoryRepository {
  create(data: Product): Promise<Product>;
  update(data: Product): Promise<Product>;
  delete(id: any): Promise<void>;
  find(limit:number,offset:number): Promise<Product[]>;
  findOne(id: number): Promise<Product>;
}


export interface Cat{
  
}