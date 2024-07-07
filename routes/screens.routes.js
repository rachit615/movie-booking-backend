const express = require("express");
const router = express.Router();
const screensController = require("../controllers/screens.controller");

// Define routes
router.post("/create-screen/:theaterId", screensController.createScreenLayout);

module.exports = router;
