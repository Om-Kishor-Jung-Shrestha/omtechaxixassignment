
// import express from "express";
// import cors from "cors";

// const app = express();
// app.disable("x-powered-by");

// const PORT = process.env.PORT || 8000;

// const allowedOrigins = [
//   process.env.CLIENT_URL,
//   "http://localhost:3000",
//   "http://127.0.0.1:3000",
// ].filter(Boolean) as string[];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//         return;
//       }

//       callback(new Error("Not allowed by CORS"));
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
// app.use(express.json());

// app.get("/", (_req, res) => {
//   res.json({
//     message: "College Admission Management System API is running",
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });



/////second batch:
import "dotenv/config";

import express from "express";
import cors from "cors";

import { connectDB } from "./config/db";
import { connectRedis } from "./config/redis";

const app = express();

app.disable("x-powered-by");

const PORT = process.env.PORT || 8000;

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
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

app.use(express.json());

// ---------- Health Check ----------

app.get("/", (_req, res) => {
  res.json({
    message:
      "College Admission Management System API is running. This is just a checking",
  });
});

// ---------- Start Server ----------

async function startServer(): Promise<void> {
  try {
    await connectDB();

    console.log("✅ MongoDB connected");

    await connectRedis();

    console.log("✅ Redis connected");

    app.listen(PORT, () => {
      console.log(
        `🚀 Server of collegeadmission management system running on http://localhost:${PORT}`
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