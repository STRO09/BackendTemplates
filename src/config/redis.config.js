/**
 * Redis client configuration.
 *
 * Creates and exports a configured Redis client instance.
 */

import { createClient } from "redis";
import env from "./env.js";
import logger from "../utils/logger.js";

const redisClient = createClient({
  socket: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  },

  password: env.REDIS_PASSWORD || undefined,

  database: env.REDIS_DATABASE,
});
  
redisClient.on("connect", () => {
  logger.success("Redis connected.");
});

redisClient.on("error", (error) => {
  logger.error("Redis connection failed.", error);
});

export default redisClient;
