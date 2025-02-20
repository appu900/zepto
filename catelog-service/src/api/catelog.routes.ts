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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        CreateProductRequest,
        req.body
      );
      if (errors) {
        res.status(400).json({ errors });
      }
      const data = await catalogService.createProduct(input);
      res.status(201).json(data);
    } catch (error) {
      const err = error as Error;
      res.status(500).json(err.message);
    }
  }
);

router.patch(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id) || 0;
    try {
      const id = parseInt(req.params.id) || 0;
      const data = await catalogService.updateProduct({ id, ...req.body });
      res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      res.status(500).json(err.message);
    }
  }
);

router.get(
  "/products",
  async (req: Request, res: Response, next: NextFunction) => {
    const limit = Number(req.query["limit"]);
    const offset = Number(req.query["offset"]);
    try {
      const data = await catalogService.fetchProducts(limit, offset);
      res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      res.status(500).json(err.message);
    }
  }
);

router.get(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id) || 0;
      const data = await catalogService.getProduct(id);
      res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      res.status(500).json(err.message);
    }
  }
);

router.delete(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(404).json({
          message: "Product with this ID not found on server",
        });
      }
      const response = await catalogService.deleteProduct(parseInt(id));
      res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json(err.message);
    }
  }
);

export default router;
