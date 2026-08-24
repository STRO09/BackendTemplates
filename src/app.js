import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import env from "./config/env.js";
import helmetMiddleware from "./middleware/helmet.middleware.js";
import routes from "./routes/index.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import requestId from "./middleware/requestId.middleware.js";

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGINS.split(","),
    credentials: true,
  }),
);

app.use(helmetMiddleware);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(requestId);

app.use("/api", routes);

app.use(errorMiddleware);

export default app;
