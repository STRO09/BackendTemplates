import rateLimit from "express-rate-limit";

/**
 * Build a rate limiter with a custom key generator.
 *
 * @param {Object} options
 *
 * @param {number} options.windowMs
 * Time window in milliseconds.
 *
 * @param {number} options.limit
 * Maximum number of requests allowed within the time window.
 *
 * @param {Function} options.keyGenerator
 * Function used to identify a client.
 *
 * @returns {import("express").RequestHandler}
 */
function create({ windowMs, limit, keyGenerator }) {
  return rateLimit({
    windowMs,
    limit,
    keyGenerator,

    standardHeaders: true,

    legacyHeaders: false,
  });
}

/**
 * Rate limit requests by IP address.
 *
 * @param {Object} options
 *
 * @param {number} options.windowMs
 *
 * @param {number} options.limit
 *
 * @returns {import("express").RequestHandler}
 */
function byIp({ windowMs, limit }) {
  return create({
    windowMs,
    limit,

    keyGenerator: (req) => req.ip,
  });
}

/**
 * Rate limit requests by authenticated user.
 *
 * Requires an authentication middleware to populate `req.user`.
 *
 * @param {Object} options
 *
 * @param {number} options.windowMs
 *
 * @param {number} options.limit
 *
 * @returns {import("express").RequestHandler}
 */
function byUser({ windowMs, limit }) {
  return create({
    windowMs,
    limit,

    keyGenerator: (req) => req.user.id,
  });
}

/**
 * Rate limit requests by email address.
 *
 * Requires `req.body.email` to be present.
 *
 * @param {Object} options
 *
 * @param {number} options.windowMs
 *
 * @param {number} options.limit
 *
 * @returns {import("express").RequestHandler}
 */
function byEmail({ windowMs, limit }) {
  return create({
    windowMs,
    limit,

    keyGenerator: (req) => req.body.email,
  });
}

/**
 * Rate limit requests by refresh token.
 *
 * Requires a refresh token cookie.
 *
 * @param {Object} options
 *
 * @param {number} options.windowMs
 *
 * @param {number} options.limit
 *
 * @returns {import("express").RequestHandler}
 */
function byRefreshToken({ windowMs, limit }) {
  return create({
    windowMs,
    limit,

    keyGenerator: (req) => req.cookies.refreshToken,
  });
}

export default {
  byIp,
  byUser,
  byEmail,
  byRefreshToken,
};

/*
Usage Example:

import strategies from "./strategies.js";

router.post(
  "/login",
  strategies.byIp({
    windowMs: 15 * 60 * 1000,
    limit: 5,
  }),
  controller,
);
*/