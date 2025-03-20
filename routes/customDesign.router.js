const express = require("express");
const designController = require("../controllers/customDesign.controller");
const router = express.Router();
const upload = require('../config/multer.config');

router.post("/create-design", upload.single('image'), designController.createDesign);
router.get("/get-all-designs-by-supplier", designController.getDesignBySupplier);

module.exports = router;