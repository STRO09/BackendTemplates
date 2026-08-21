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
const authStrategy = required("AUTH_STRATEGY");
const paymentProvider = required("PAYMENT_PROVIDER");

/**
 * Application configuration.
 */
const env = {
  /*
   * Application.
   */
  PORT: process.env.PORT ?? 3000,

  NODE_ENV: process.env.NODE_ENV ?? "development",

  CORS_ORIGINS: process.env.CORS_ORIGINS ?? "http://localhost:3000",

  /*
   * Database.
   */
  DB_DRIVER: required("DB_DRIVER"),

  MONGO_URI: process.env.MONGO_URI,

  /*
   * Authentication.
   */
  AUTH_STRATEGY: authStrategy,

  JWT_SECRET: required("JWT_SECRET"),

  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "15m",

  REFRESH_SECRET:
    authStrategy === "jwt-refresh"
      ? required("REFRESH_SECRET")
      : process.env.REFRESH_SECRET,

  REFRESH_EXPIRES_IN:
    authStrategy === "jwt-refresh"
      ? (process.env.REFRESH_EXPIRES_IN ?? "7d")
      : process.env.REFRESH_EXPIRES_IN,

  /*
   * Token transport.
   */
  ACCESS_TOKEN_TRANSPORT: process.env.ACCESS_TOKEN_TRANSPORT ?? "bearer",

  ACCESS_TOKEN_COOKIE_NAME:
    process.env.ACCESS_TOKEN_COOKIE_NAME ?? "accessToken",

  REFRESH_TOKEN_COOKIE_NAME:
    process.env.REFRESH_TOKEN_COOKIE_NAME ?? "refreshToken",

  /*
   * File storage.
   */
  FILE_STORAGE_PROVIDER: process.env.FILE_STORAGE_PROVIDER ?? "local",

  /*
   * Cache.
   */
  CACHE_PROVIDER: process.env.CACHE_PROVIDER ?? "memory",

  /*
   * Sockets.
   */
  SOCKET_PROVIDER: process.env.SOCKET_PROVIDER ?? "socketio",

  /*
   * Redis.
   */

  REDIS_HOST: process.env.REDIS_HOST ?? "127.0.0.1",

  REDIS_PORT: Number(process.env.REDIS_PORT ?? 6379),

  REDIS_PASSWORD: process.env.REDIS_PASSWORD,

  REDIS_DATABASE: Number(process.env.REDIS_DATABASE ?? 0),

  /*
   * Gmail smptp server config for nodemailer and Resend.
   */

  SMTP_HOST: process.env.SMTP_HOST,

  SMTP_PORT: process.env.SMTP_PORT ?? 25,

  SMTP_SECURE: process.env.SMTP_SECURE ?? "false",

  SMTP_USER: process.env.SMTP_USER,

  SMTP_PASSWORD: process.env.SMTP_PASSWORD,

  MAIL_FROM: process.env.MAIL_FROM ?? "noreply@localhost",

  NOTIFICATION_PROVIDER: required("NOTIFICATION_PROVIDER"),

  /*
   * Resend.
   */

  RESEND_API_KEY: process.env.RESEND_API_KEY,

  /*
   * Payment.
   */
  PAYMENT_PROVIDER: paymentProvider,

  RAZORPAY_KEY_ID: paymentProvider === "razorpay" ? required("RAZORPAY_KEY_ID") : process.env.RAZORPAY_KEY_ID,

  RAZORPAY_KEY_SECRET: paymentProvider === "razorpay" ? required("RAZORPAY_KEY_SECRET") : process.env.RAZORPAY_KEY_SECRET,
};

export default env;
