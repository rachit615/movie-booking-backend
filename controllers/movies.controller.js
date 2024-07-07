// controllers/moviesController.js
const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.createMovie = async (req, res) => {
  const { title, description, genre } = req.body;
  const movie_id = uuidv4();

  try {
    // Insert movie information
    await pool.query(
      `INSERT INTO movies (movie_id, title, description, genre) VALUES (?, ?, ?, ?)`,
      [movie_id, title, description, genre]
    );

    res.status(201).json({
      message: "Movie created successfully",
      movie_id,
    });
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({ error: "Failed to create movie" });
  }
};
