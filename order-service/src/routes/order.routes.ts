import express, { Request, Response } from "express";
import { MessageBroker } from "../utils/broker";
import { OrderEvent } from "../types";
const router = express.Router();

router.post("/order", async (req: Request, res: Response) => {
  // todo:order create logic to be here
  await MessageBroker.publish({
    topic: "OrderEvents",
    headers: { token: req.headers.authorization },
    event: OrderEvent.CREATE_ORDER,
    message: {
      orderId: 1,
      items: [
        {
          productId: 1,
          quantity: 1,
          price: 100,
        },
        {
          productId: 2,
          quantity: 2,
          price: 200,
        },
      ],
    },
  });
  res.status(201).json({
    message: "added product to the order",
  });
});

router.get("/order", async (req, res) => {
  res.status(200).json({
    message: "order items",
  });
});

router.get("/order/:id", async (req, res) => {
  res.status(200).json({
    message: "order item fetched successfully by id",
  });
});

router.delete("/order/:id", async (req, res) => {
  res.status(200).json({
    message: "order cleared",
  });
});

export default router;
