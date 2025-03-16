const express = require("express");
const userController = require("../controllers/users.controller");
const router = express.Router();
const upload = require('../config/multer.config');

router.put("/update-user/:id", userController.updateUser);
router.get("/get-single-user/:id", userController.getSingleUser);
router.put("/update-password/:id", userController.updatePassword);
router.get("/get-all-users", userController.getAllUsers);
router.get("/get-all-suppliers", userController.getAllSuppliers);
router.put(
    "/update-image/:id",
    upload.single('picture'),
    userController.uploadImage);

module.exports = router;
