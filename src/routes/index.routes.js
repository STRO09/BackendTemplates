import express from "express";
import productRouter from "./product.routes.js";
import authRouter from "./auth.routes.js";
const router = express.Router();

router.use("/products", productRouter);
router.use("/auth", authRouter);

export default router;