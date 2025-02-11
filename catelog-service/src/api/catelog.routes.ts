import express, { Request, Response, NextFunction } from "express";
import { CatelogService } from "../service/catelog.service";
import { CatelogRepository } from "../repository/catelog.repository";
import { RequestValidator } from "../utils/requestValidator";
import { CreateProductRequest } from "../dto/product.dto";
const router = express.Router();

// endpointes to be placed here !!!!

export const catalogService = new CatelogService(new CatelogRepository());

router.post(
  "/products",
  async (req: Request, res: Response, next: NextFunction)=> {
    const { errors, input } = await RequestValidator(
      CreateProductRequest,
      req.body
    );
    if (errors) {
      res.status(400).json({ errors });
    }
    const data = await catalogService.createProduct(input);
    res.status(201).json(data);
  }
);

export default router;
