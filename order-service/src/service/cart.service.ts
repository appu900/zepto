export const CreateCart = async (input: any) => {
  return {
    message: "added product to the cart",
  };
};

export const GetCart = async (cartId: string) => {
  return {
    cartId,
    products: [],
  };
};

export const updateCart = async (input: any) => {
  return {
    message: "cart updated",
  };
};

export const deleteCart = async (cartId: string) => {
  return {
    message: "cart deleted",
  };
};
