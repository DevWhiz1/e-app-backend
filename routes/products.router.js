const express = require("express");
const productController = require("../controllers/products.controller");
const router = express.Router();
const upload = require('../config/multer.config');

// router.post("/create-product", upload.single('image'), productController.createProduct);
router.post("/create-product", productController.createProduct);
router.get("/get-all-products", productController.getAllProducts);
router.get("/get-product-by-id/:id", productController.getProductById);
router.get("/get-products-by-supplier/:id", productController.getProductsBySupplier);

module.exports = router;