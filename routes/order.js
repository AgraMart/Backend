const express = require("express");
const router = express.Router();
const orderController = require('../controllers/orderController')
const authController = require('../controllers/authController')


router.post("/createOrder",authController.authPass, orderController.createOrder);
router.post("/updateDelivery", orderController.updateDelivery);
router.get("/mySales",authController.authPass, orderController.mySales);

module.exports = router;
