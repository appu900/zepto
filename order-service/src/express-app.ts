import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import OrderRoutes from "./routes/order.routes";
import CartRoutes from "./routes/cart.routes";
import { HandleErrorWithLogger } from "./utils/error/handler";
import { httpLogger } from "./utils/logger";

const app = express();
app.use(express.json());
app.use(httpLogger);
app.use(cors());

app.use("/api", OrderRoutes);
app.use("/api", CartRoutes);

// health check function
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("Server is running");
});

app.use(HandleErrorWithLogger);

export default app;
