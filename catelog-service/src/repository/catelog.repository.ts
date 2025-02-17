import { ICategoryRepository } from "../interface/catelogRepository.interface";
import { Product } from "../models/product.model";
import { ProductFactory } from "../utils/fixtures";
import { PrismaClient } from "@prisma/client";

export class CatelogRepository implements ICategoryRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }
  async create(data: Product): Promise<Product> {
    return this._prisma.product.create({
      data: data,
    });
  }

  async update(data: Product): Promise<Product> {
    return this._prisma.product.update({
      where: {
        id: data.id,
      },
      data: data,
    });
  }

  async delete(id: any): Promise<void> {
    const product = this._prisma.product.delete({
      where: {
        id: id,
      },
    });
    return Promise.resolve();
  }
  async find(limit: number, offset: number): Promise<Product[]> {
    return this._prisma.product.findMany({
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
      },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this._prisma.product.findFirst({
      where: {
        id: id,
      },
    });
    if (product) {
      return Promise.resolve(product)
    }
    throw new Error(`Product with ${id} not found`);
  }
}
