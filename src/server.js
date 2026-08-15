import http from "http";
import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/db.config.js";
import redisClient from "./config/redis.config.js";
import logger from "./utils/logger.js";

async function start() {
  try {
    await connectDB();

    const server = http.createServer(app);

    logger.info("Starting application");

    await redisClient.connect();

    logger.info("Starting socket server");

    server.listen(env.PORT, () => {
      logger.success("Server listening", {
        port: env.PORT,
      });
    });
  } catch (err) {
    logger.error("Failed to start service", { err });
    process.exit(1);
  }
}

start();
