import express from "express";

import authController from "../controllers/auth.controller.js";
import verificationController from "../controllers/emailVerification.controller.js";
import validate from "../middleware/validation.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";

import { registerSchema, loginSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register", validate(registerSchema), authController.register);

router.post("/login", validate(loginSchema), authController.login);

router.post("/refresh", authController.refresh);

router.post("/verify-email/send", authenticate, verificationController.send);

router.get("/verify-email", verificationController.verify);


// DO NOT USE THIS LOGOUT ROUTES WITH JWT. JWT IS MEANT TO BE STATELESS AND HENCE CAN'T BE INVALIDATED FROM SERVER. CLEAR THE COOKIE/STORAGE INSTEAD FROM CLIENT SIDE.

router.post("/logout", authenticate, authController.logout);

router.post("/logout-all", authenticate, authController.logoutAll);

export default router;
