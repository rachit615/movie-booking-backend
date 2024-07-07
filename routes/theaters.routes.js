const express = require("express");
const router = express.Router();
const theatersController = require("../controllers/theaters.controller");

// Define routes
router.post("/create-theater", theatersController.createTheater);
router.put("/update-theater/:theaterId", theatersController.updateTheater);
router.get("/theaters/:cityId", theatersController.getTheatersByCity);

module.exports = router;
