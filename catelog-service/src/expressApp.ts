import express from "express";
import catelogRouter from "./api/catelog.routes";
import { httpLogger } from "./utils";
import { HandleErrorWithLogger } from "./utils/error/handlers";

const PORT = 5000;

const app = express();
app.use(express.json());
app.use(httpLogger);

// routes
app.use("/", catelogRouter);

// global middleware
app.use(HandleErrorWithLogger);

export default app;
