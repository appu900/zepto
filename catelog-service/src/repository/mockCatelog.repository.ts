import { ICategoryRepository } from "../interface/catelogRepository.interface";
import { Product } from "../models/product.model";
export class MockCatelogRepository implements ICategoryRepository{
    create(data: Product): Promise<Product> {
        const mockProduct = {
            id:123,
            ...data
        } as Product

        return Promise.resolve(mockProduct)

    }
    update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    delete(id: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }

}

