import { CartLineItem } from "../db/schema";
import {  CartEditRequestInput, CartRequestInput } from "../dto/cartRequest.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { GetProductDetails } from "../utils/broker";
import { NotFoundError } from "../utils/error/errors";
import { logger } from "../utils/logger";

export const CreateCart = async (
  input: CartRequestInput,
  repo: CartRepositoryType
) => {
  // synchronously interservice communication
  const product = await GetProductDetails(input.productId);
  logger.info("fetched product from order-service: " + product);
  if (product && product.stock < input.qty) {
    throw new Error("product is out of stock");
  }
  const payload = {
    productId: product.id,
    price: product.price.toString(),
    qty: input.qty,
    itemName: product.name,
    variant: product.variant,
  };
  return await repo.createCart(input.customerId, payload as CartLineItem);
};

export const GetCart = async (cartId: number, repo: CartRepositoryType) => {
  const data = await repo.findCart(cartId);
  if (!data) {
    throw new NotFoundError("cart not found");
  }
  return data;
};

export const updateCart = async (
  input: CartEditRequestInput,
  repo: CartRepositoryType
) => {
  const data = await repo.updateCart(input.id, input.qty);
  return data;
};

export const deleteCart = async (cartId:number, repo: CartRepositoryType) => {
  const data = await repo.deleteCart(cartId);
  return data;
};
