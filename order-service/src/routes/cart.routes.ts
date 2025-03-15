import express, { NextFunction, Request, Response } from "express";
import * as service from "../service/cart.service";
import * as repository from "../repository/cart.repository";
import { ValidateRequest } from "../utils/validator";
import { CartRequestInput, CartRequestSchema } from "../dto/cartRequest.dto";
const router = express.Router();
const repo = repository.CartRepository;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const isValidUser = true;
  if (!isValidUser) {
    res.status(403).json({ message: "unauthorized" });
    return;
  }
  next();
};

// ** create a new cart **
router.post(
  "/cart",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
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
      next(error);
    }
  }
);

router.get("/cart", async (req, res) => {
  const customerId = req.body.customerId;
  const response = await service.GetCart(customerId, repo);
  res.status(200).json({
    message: "cart items",
    data: response,
  });
});

router.patch("/cart/:lineItemId", async (req, res) => {
  const cartLineItemsId = req.params.lineItemId;
  const response = await service.updateCart(
    {
      id: +cartLineItemsId,
      qty: req.body.qty,
    },
    repo
  );
  res.status(200).json({
    message: "cart updated",
    data: response,
  });
});

router.delete("/cart/:lineItemId", async (req, res) => {
  const cartLineItemsId = req.params.lineItemId;
  const response = await service.deleteCart(+cartLineItemsId, repo);
  res.status(200).json({
    message: "product removed from cart",
  });
});

const username = "appu";

export default router;
