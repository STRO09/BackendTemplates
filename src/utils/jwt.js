import jwt from "jsonwebtoken";

import env from "../config/env.js";

/**
 * Signs a JWT using the application's configured JWT secret.
 *
 * @param {Object} payload
 * Data to encode into the token.
 *
 * @param {Object} [options]
 * Additional jsonwebtoken signing options.
 *
 * @returns {string}
 * Signed JWT.
 */
export function sign(payload, options = {}) {
    return jwt.sign(
        payload,
        env.JWT_SECRET,
        {
            expiresIn: env.JWT_EXPIRES_IN,
            ...options
        }
    );
}

/**
 * Verifies and decodes an application JWT.
 *
 * @param {string} token
 * JWT to verify.
 *
 * @returns {Object}
 * Decoded JWT payload.
 *
 * @throws {JsonWebTokenError|TokenExpiredError}
 * If the token is invalid or expired.
 */
export function verify(token) {
    return jwt.verify(token, env.JWT_SECRET);
}