import express from "express";
import controller from "../controllers/product.controller.js";
import validate from "../middleware/validation.middleware.js";
import { createProductSchema } from "../validators/product.validator.js";

const router = express.Router();

router.post(
    "/",
    validate(createProductSchema),
    controller.create
);

router.get(
    "/",
    controller.getAll
);

router.get(
    "/:id",
    controller.getById
);

export default router;