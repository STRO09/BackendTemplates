import express from "express";
import controller from "../controllers/product.controller.js";
import validate from "../middleware/validation.middleware.js";
import { createProductSchema } from "../validators/product.validator.js";
import { authenticate } from "../middleware/auth.middleware.js";
import cacheProvider from "../cache/providers/provider.js";

const router = express.Router();

router.post("/", validate(createProductSchema), controller.create);

router.get("/", authenticate, controller.getAll);

// router.get("/cache", async (req, res) => {
//   await cacheProvider.set(
//     "test",
//     {
//       message: "Hello Redis",
//     },
//     60,
//   );

//   const data = await cacheProvider.get("test");

//   res.json(data);
// });

// router.get("/cache2", async (req, res) => {
//   const data = await cacheProvider.get("test");

//   res.json(data);
// });

router.get("/:id", controller.getById);

export default router;
