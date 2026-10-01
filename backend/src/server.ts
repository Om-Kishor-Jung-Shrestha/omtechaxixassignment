import "reflect-metadata";

import "dotenv/config";


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db";
import { connectRedis } from "./config/redis";

import authRoutes from "./routes/auth.routes";

import { responseMiddleware } from "./middleware/response.middleware";
import { errorMiddleware } from "./middleware/error.middleware";
import {
  requestLoggerMiddleware,
} from "./middleware/request-logger.middleware";
import courseRoutes from "./routes/course.routes";
import programRoutes from "./routes/program.routes";
import userRoutes from "./routes/user.routes";
import applicationRoutes from "./routes/application.route";
import dashboardRoutes from "./routes/dashboard.routes";
import { configureCloudinary } from "./config/cloudinary";
// import { configureCloudinary } from "./configservices/cloudinary.config";
import publicProgramCatalogRoutes from "./routes/public-program-catalog.route";

import userProfileRoute from "./routes/user-profile.route";

const app = express();

app.disable("x-powered-by");

const PORT =
  process.env.PORT || 8000;

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000","http://localhost:5173",
  "http://127.0.0.1:3000",
].filter(Boolean) as string[];

// ---------- Middleware ----------

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin)
      ) {
        callback(null, true);
        return;
      }

      callback(
        new Error("Not allowed by CORS")
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use(cookieParser());

app.use(express.json());

app.use(responseMiddleware);

// ---------- Health Check ----------

app.get("/", (_req, res) => {
  res.apiSuccess(
    {
      service:
        "College Admission Management System API",
    },
    "API is running"
  );
});
app.use(requestLoggerMiddleware);

app.use(
  "/api/v1/public/catalog",
  publicProgramCatalogRoutes,
);
// ---------- Routes ----------

// app.use(
//   "/api/v1/auth",
//   authRoutes
// );
// app.use("/api/v1/programs", programRoutes);
// app.use("/api/v1/courses", courseRoutes);
// app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/applications", applicationRoutes);
// app.use(
//   "/api/v1/dashboard",
//   dashboardRoutes
// );
// app.use("/api/users/profile", userProfileRoute);
// // ---------- Central Error Handler ----------
app.use(
  "/api/v1/auth",
  authRoutes
);

app.use("/api/v1/programs", programRoutes);

app.use("/api/v1/courses", courseRoutes);

// Profile must come before /users because /users has /:id
app.use("/api/v1/users/profile", userProfileRoute);

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/applications", applicationRoutes);

app.use(
  "/api/v1/dashboard",
  dashboardRoutes
);

app.use(errorMiddleware);

// ---------- Start Server ----------

async function startServer(): Promise<void> {
  try {
    await connectDB();

    console.log("✅ MongoDB connected");

    await connectRedis();
    configureCloudinary();

    console.log("✅ Redis connected");

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "❌ Server startup failed:",
      error
    );

    process.exit(1);
  }
}

startServer();