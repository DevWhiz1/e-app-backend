const express = require("express");
const {createUserCart} = require("../controllers/cart.controller");
const router = express.Router();

router.post("/save", createUserCart);

module.exports = router;
