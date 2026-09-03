import http from "http";
import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/db.config.js";
import redisClient from "./config/redis.config.js";
import { initializeSockets } from "./socket/socket.js";
import logger from "./utils/logger.js";

async function start() {
  try {
    await connectDB();

    const server = http.createServer(app);

    logger.info("Starting application");

    // try {
    //   redisClient.connect();
    // } catch (err) {
    //   logger.warn(
    //     "Failed to connect to Redis with all retries. Continuing without Redis.",
    //     { err },
    //   );
    // }

    server.listen(env.PORT, () => {
      logger.success("Server listening", {
        port: env.PORT,
      });
    });

    // logger.info("Starting socket server");
    // initializeSockets(server);
  } catch (err) {
    logger.error("Failed to start service", { err });
    process.exit(1);
  }
}

start();
