require("dotenv").config(); // Ensure env variables are loaded first

var createError = require("http-errors");
var express = require("express");
var path = require("path");
const cors = require("cors");
var logger = require("morgan");
const db = require("./db/db.js");

var indexRouter = require("./routes/index.router.js");
var usersRouter = require("./routes/users.router.js");
var authRouter = require("./routes/auth.router.js");
var cartRouter = require("./routes/cart.router.js");
var orderController = require("./routes/orders.router.js");
var productController = require("./routes/products.router.js");
var designController = require("./routes/customDesign.router.js");

const port = process.env.PORT || 3000;
var app = express();

// Connect to database
db();

// // CORS Configuration
const allowedOrigins = [
  "http://localhost:8081", 
];

app.use(
  cors({
    // origin: "*", // Allow all origins (for development only)
    // methods: "GET,POST,PUT,DELETE",
    // allowedHeaders: "Content-Type,Authorization",
    allowedOrigins: allowedOrigins,
  })
);

app.use(logger("dev"));
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/cart", cartRouter);
app.use("/api/auth", authRouter);
app.use("/api/orders", orderController);
app.use("/api/products", productController);
app.use("/api/design", designController);

// Handle 404 errors
app.use((req, res, next) => {
  next(createError(404));
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

module.exports = app;
