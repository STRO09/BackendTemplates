/**
 * Loads and validates application environment variables.
 *
 * All configuration values should be accessed through this module
 * instead of using process.env directly.
 *
 * This provides:
 * - Centralized configuration
 * - Early validation
 * - Consistent defaults
 * - Easier testing
 */

import dotenv from "dotenv";
dotenv.config();

/**
 * Retrieve a required environment variable.
 *
 * @param {string} key
 * Environment variable name.
 *
 * @throws {Error}
 * If the variable is missing.
 *
 * @returns {string}
 */

function required(key) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} is missing`);
  }

  return value;
}

/**
 * Application configuration.
 *
 * @type {{
 * PORT:number|string,
 * MONGO_URI:string|undefined,
 * DB_DRIVER:string,
 * NODE_ENV:string
 * }}
 */
const env = {
  PORT: process.env.PORT ?? 3000,
  MONGO_URI: process.env.MONGO_URI,
  DB_DRIVER: required("DB_DRIVER"),
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: required("JWT_SECRET"),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "15m",
  AUTH_STRATEGY: required("AUTH_STRATEGY"),
  REFRESH_SECRET:
    process.env.AUTH_STRATEGY === "jwt-refresh"
      ? required("REFRESH_SECRET")
      : process.env.REFRESH_SECRET,
  REFRESH_EXPIRES_IN:
    process.env.AUTH_STRATEGY === "jwt-refresh"
      ? process.env.REFRESH_EXPIRES_IN ?? "7d"
      : process.env.REFRESH_EXPIRES_IN,
  ACCESS_TOKEN_TRANSPORT: process.env.ACCESS_TOKEN_TRANSPORT,
  ACCESS_TOKEN_COOKIE_NAME: process.env.ACCESS_TOKEN_COOKIE_NAME ?? "accessToken",
  REFRESH_TOKEN_COOKIE_NAME: process.env.REFRESH_TOKEN_COOKIE_NAME ?? "refreshToken",
};

export default env;
