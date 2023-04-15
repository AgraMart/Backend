const express = require("express");
const router = express.Router();
const itemController = require('../controllers/itemController')
const authController = require('../controllers/authController')

router.post("/newItem",authController.authPass, itemController.newItem);
router.post("/editItem",authController.authPass, itemController.editItem);
router.delete("/deleteItem",authController.authPass, itemController.deleteItem);
router.get("/showAllItems", itemController.showAllItems);

module.exports = router;
