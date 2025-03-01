import { CartRequestInput } from "../dto/cartRequest.dto";
import { CartRepositoryType } from "../types/repository.type";
import { GetProductDetails } from "../utils/broker";

export const CreateCart = async (
  input: CartRequestInput,
  repo: CartRepositoryType
) => {
  // make a call to our catalog microservice
  // it will be sync call
  const product = await GetProductDetails(input.productId);
  if (product && product.Stock < input.qty) {
    throw new Error("product is out of stock");
  }
  const data = await repo.create(input);
  return data;
};

export const GetCart = async (cartId: string, repo: CartRepositoryType) => {
  const data = await repo.find({ id: cartId });
  return data;
};

export const updateCart = async (input: any, repo: CartRepositoryType) => {
  const data = await repo.update(input);
  return data;
};

export const deleteCart = async (cartId: string, repo: CartRepositoryType) => {
  const data = await repo.delete(cartId);
  return data;
};
