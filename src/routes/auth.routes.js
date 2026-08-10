import express from "express";

import authController from "../controllers/auth.controller.js";
import validate from "../middleware/validation.middleware.js";

import { registerSchema, loginSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register", validate(registerSchema), authController.register);

router.post("/login", validate(loginSchema), authController.login);

router.post("/refresh", authController.refresh);

export default router;
