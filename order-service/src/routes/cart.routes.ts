import express, { Request, Response } from "express";
const router = express.Router();
import * as service from "../service/cart.service"

router.post("/cart", async (_req: Request, res: Response) => {
  res.status(201).json({
    message: "added product to the cart",
  });
});

router.get("/cart", async (req, res) => {
  res.status(200).json({
    message: "cart items",
  });
});

router.patch("/cart", async (req, res) => {
  res.status(200).json({
    message: "cart updated",
  });
});

router.delete("/cart", async (req, res) => {
  res.status(200).json({
    message: "cart cleared",
  });
});

export default router;
