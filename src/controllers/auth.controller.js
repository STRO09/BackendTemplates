import authService from "../services/auth.service.js";
import cookieTransport from "../auth/transports/cookie.transport.js";
import { deliverCredentials } from "../auth/credentialTransport.js";
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
    const result = await authService.login(req.body, {
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
    });

    const { user, ...credentials } = result;

    const response = deliverCredentials(res, credentials);

    return success(res, {
      message: "Login successful.",
      data: {
        user,
        ...response,
      },
    });
  });

  refresh = asyncHandler(async (req, res) => {
    const refreshToken = cookieTransport.extractRefreshToken(req);

    if (!refreshToken) {
      throw new ApiError({
        statusCode: 401,
        message: "Refresh token required.",
      });
    }

    const credentials = await authService.refresh(refreshToken, {
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
    });

    const response = deliverCredentials(res, credentials);

    return success(res, {
      message: "Token refreshed successfully.",
      data: response,
    });
  });
}

export default new AuthController();
