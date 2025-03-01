import express, { Request, Response } from "express";
import * as service from "../service/cart.service";
import * as repository from "../repository/cart.repository";
import { ValidateRequest } from "../utils/validator";
import { CartRequestInput, CartRequestSchema } from "../dto/cartRequest.dto";
const router = express.Router();
const repo = repository.CartRepository;



// ** create a new cart **
router.post("/cart", async (req: Request, res: Response) => {
  try {
    const validationError = ValidateRequest<CartRequestInput>(
      req.body,
      CartRequestSchema
    );
    if (validationError) {
      res.status(400).json({
        error: validationError,
      });
    }

    const response = await service.CreateCart(req.body, repo);
    res.status(201).json({
      message: "product added to cart",
      data: response,
    });
  } catch (error) {
    res.status(404).json({
      error: error,
    });
  }
});

router.get("/cart/:id", async (req, res) => {
  const cartID = req.params.id;
  const response = await service.GetCart(req.params.id, repo);
  res.status(200).json({
    message: "cart items",
    data: response,
  });
});

router.patch("/cart", async (req, res) => {
  const response = await service.updateCart(req.body, repo);
  res.status(200).json({
    message: "cart updated",
    data: response,
  });
});

router.delete("/cart", async (req, res) => {
  const response = await service.deleteCart(req.body, repo);
  res.status(200).json({
    message: "cart cleared",
  });
});

const username = "appu";

export default router;
