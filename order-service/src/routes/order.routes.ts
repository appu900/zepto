import express, { Request, Response } from "express";
const router = express.Router();

router.post("/order", async (_req: Request, res: Response) => {
  res.status(201).json({
    message: "added product to the order",
  });
});

router.get("/order", async (req, res) => {
  res.status(200).json({
    message: "order items",
  });
});

router.get("/order/:id",async(req,res)=>{
  res.status(200).json({
    message: "order item fetched successfully by id",
  });
})


router.delete("/order/:id", async (req, res) => {
  res.status(200).json({
    message: "order cleared",
  });
});

export default router;
