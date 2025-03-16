import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import OrderRoutes from "./routes/order.routes";
import CartRoutes from "./routes/cart.routes";
import { HandleErrorWithLogger } from "./utils/error/handler";
import { httpLogger } from "./utils/logger";
import { MessageBroker } from "./utils/broker";
import { Producer, Consumer } from "kafkajs";

export const ExpressApp = async () => {
  const app = express();
  app.use(express.json());
  app.use(httpLogger);

  // ** connect to prducer
  const producer = await MessageBroker.connectProducer<Producer>();
  producer.on("producer.connect", () => {
    console.log("Producer is connected");
  });

  // ** connect to consumer
  const consumer = await MessageBroker.connectConsumer<Consumer>();
  consumer.on("consumer.connect", () => {
    console.log("consumer is connected");
  });

  await MessageBroker.subscribe((message) => {
    console.log("consumer recived message");
    console.log("recived the message",message);
  }, "OrderEvents");

  app.use(cors());

  app.use("/api", OrderRoutes);
  app.use("/api", CartRoutes);

  // health check function
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).send("Server is running");
  });

  app.use(HandleErrorWithLogger);
  return app;
};
