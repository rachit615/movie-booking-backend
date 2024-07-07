const express = require("express");
const router = express.Router();
const showTimesController = require("../controllers/showtimes.controller");

// Define routes
router.post("/create-movie-show", showTimesController.createMovieShow);

module.exports = router;
