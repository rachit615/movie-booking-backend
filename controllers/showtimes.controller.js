const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.createMovieShow = async (req, res) => {
  const { movie_id, theater_id, screen_id, start_time, end_time } = req.body;
  const showtime_id = uuidv4();

  try {
    // Insert showtime information
    await pool.query(
      `INSERT INTO showtimes (showtime_id, movie_id, theater_id, screen_id, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?)`,
      [showtime_id, movie_id, theater_id, screen_id, start_time, end_time]
    );

    res.status(201).json({
      message: "Showtime created successfully",
      showtime_id,
    });
  } catch (error) {
    console.error("Error creating showtime:", error);
    res.status(500).json({ error: "Failed to create showtime" });
  }
};
