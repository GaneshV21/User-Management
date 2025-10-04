require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

// Routers
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

// App setup
const app = express();

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// CORS
app.use(
  cors({
    origin: process.env.CORS || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "X-Auth-Header"],
    credentials: true,
  })
);

// Routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);

// Health check route (for browser test)
app.get("/", (req, res) => {
  res.send("✅ Backend running on Vercel!");
});

// 404 handler
app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Run locally only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8002;
  app.listen(PORT, () => console.log(`🚀 Local server running on port ${PORT}`));
}

// Export for Vercel
module.exports = app;
