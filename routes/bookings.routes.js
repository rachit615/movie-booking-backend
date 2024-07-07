const express = require("express");
const router = express.Router();
const bookingsController = require("../controllers/bookings.controller");

// Define routes
router.post("/create-booking", bookingsController.createMovieBooking);

module.exports = router;
