import express, { Request, Response } from "express";
import * as service from "../service/cart.service"
import * as repository from "../repository/cart.repository"
const router = express.Router();
const repo = repository.CartRepository

router.post("/cart", async (req: Request, res: Response) => {
  const response = await service.CreateCart(req.body,repo)
  res.status(201).json({
    message: "added product to the cart",
    data:response
  });
});

router.get("/cart/:id", async (req, res) => {
  const cartID = req.params.id
  const response = await service.GetCart(req.params.id,repo)
  res.status(200).json({
    message: "cart items",
    data:response
  });
});

router.patch("/cart", async (req, res) => {
  const response = await service.updateCart(req.body,repo)
  res.status(200).json({
    message: "cart updated",
    data:response
  });
});

router.delete("/cart", async (req, res) => {
  const response = await service.deleteCart(req.body,repo)
  res.status(200).json({
    message: "cart cleared",
  });
});

const username = "appu"

export default router;


