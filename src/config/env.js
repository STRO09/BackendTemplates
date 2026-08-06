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
};

export default env;
