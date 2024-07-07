const pool = require("../config/db");

exports.getAllCities = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM city`);
    console.log("rows", rows);
    res.status(200).json({ cities: rows });
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
};
