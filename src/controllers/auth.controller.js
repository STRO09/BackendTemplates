import authService from "../auth/auth.service.js";

import { success } from "../utils/response.js";
import asyncHandler from "../utils/asyncHandler.js";

class AuthController {

  register = asyncHandler(async (req, res) => {
    const user = await authService.register(req.body);

    return success(res, {
      message: "Registration successful.",
      data: user,
    });
  });

  login = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);

    return success(res, {
      message: "Login successful.",
      data: result,
    });
  });
}

export default new AuthController();
