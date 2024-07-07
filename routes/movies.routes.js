// routes/movies.js
const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies.controller");

// Define routes
router.post("/create-movie", moviesController.createMovie);

module.exports = router;
