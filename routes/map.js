const express = require("express");
const router = express.Router();
const mapController = require('../controllers/mapController')

router.post("/mapNearby", mapController.mapNearby);

module.exports = router;
