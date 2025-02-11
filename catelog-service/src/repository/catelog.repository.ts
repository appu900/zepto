import { ICategoryRepository } from "../interface/catelogRepository.interface";
import { Product } from "../models/product.model";




export class CatelogRepository implements ICategoryRepository{
    create(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }

    update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }

    delete(id: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(): Promise<[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }

    
}