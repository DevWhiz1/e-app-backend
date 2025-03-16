const express = require("express");
const orderController = require("../controllers/orders.controller");
const router = express.Router();

router.post("/save", orderController.createOrder);
router.get("/supplier/:id", orderController.getOrdersBySupplier);
router.get("/supplier-past/:id", orderController.getPastOrdersBySupplier);
router.put("/update-status/:id", orderController.updateStatus);
router.get("/get-all-orders", orderController.getAllOrders);
router.get("/get-order-by-userid/:id", orderController.getOrderByUser);

module.exports = router;