import express from "express";
import productRouter from "./product.routes.js";
import authRouter from "./auth.routes.js";
import orderRouter from "./order.routes.js";
const router = express.Router();

router.use("/products", productRouter);
router.use("/auth", authRouter);
router.use("/orders", orderRouter);

export default router;