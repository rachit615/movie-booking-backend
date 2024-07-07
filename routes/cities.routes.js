const express = require("express");
const router = express.Router();
const citiesController = require("../controllers/cities.controller");

// Define routes
router.get("/cities", citiesController.getAllCities);

module.exports = router;
