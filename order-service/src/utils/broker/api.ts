import axios from "axios";
import { APIError } from "../error/errors";
import { logger } from "../logger";
import { Product } from "../../dto/product.dto";
const CATELOG_BASE_URL = "http://localhost:8000";

export const GetProductDetails = async (productId: number) => {
  try {
    const response = await axios.get(
      `${CATELOG_BASE_URL}/products/${productId}`
    );
    const product = response.data;
    console.log("fetched the product", product);
    return product as Product;
  } catch (error:any) {
    logger.error(error);
    const errorMessage = error.message
    throw new APIError("Product not found");
  }
};
