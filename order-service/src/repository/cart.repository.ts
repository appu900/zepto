import { DB } from "../db/db.connection";
import { carts } from "../db/schema";
import { CartRequestInput } from "../dto/cartRequest.dto";
import { CartRepositoryType } from "../types/repository.type";

const createCart = async (input: CartRequestInput): Promise<{}> => {
  const result = await DB.insert(carts)
    .values(input)
    .returning({ cartID: carts.id });
  return Promise.resolve({
    message: "Cart created sucessfully",
    result,
  });
};

const updateCart = async (input: any): Promise<{}> => {
  return Promise.resolve({});
};

const deleteCart = async (input: any): Promise<{}> => {
  return Promise.resolve({});
};

const getCart = async (input: any): Promise<{}> => {
  return Promise.resolve({ message: "fetched all data from users cart" });
};

export const CartRepository: CartRepositoryType = {
  create: createCart,
  find: getCart,
  update: updateCart,
  delete: deleteCart,
};
