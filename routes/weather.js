const express = require("express");
const router = express.Router();
const weatherController = require('../controllers/weatherController')

router.post("/currentWeather", weatherController.currentWeather);
router.get("/news", weatherController.news);
router.post("/chat", weatherController.chat);

module.exports = router;
