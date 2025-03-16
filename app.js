var createError = require("http-errors");
var express = require("express");
var path = require("path");
const cors = require("cors");
var logger = require("morgan");
const db = require("./db/db");

var indexRouter = require("./routes/index.router");
var usersRouter = require("./routes/users.router");
var authRouter = require("./routes/auth.router.js");
var cartRouter=require("./routes/cart.router.js");
var orderController=require("./routes/orders.router.js");
var productController=require("./routes/products.router.js");
var designController=require("./routes/customDesign.router.js");

require("dotenv").config();
var app = express();
db();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// app.use(express.static(path.join(__dirname, "public")));

app.use('/uploads', express.static(path.join(__dirname, "uploads")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/cart", cartRouter); 
app.use("/api/auth", authRouter);
app.use("/api/orders", orderController);
app.use("/api/products", productController);
app.use("/api/design", designController);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).send({ error: err.message });
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

module.exports = app;
