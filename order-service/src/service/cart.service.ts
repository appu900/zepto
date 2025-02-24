import { CartRepositoryType } from "../types/repository.type";

export const CreateCart = async (input: any, repo: CartRepositoryType) => {
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
