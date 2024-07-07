const express = require("express");
const router = express.Router();
const seatsController = require("../controllers/seats.controller");

// Define routes
router.get("/select-seat/:showtime_id", seatsController.selectSeatLayout);

module.exports = router;
