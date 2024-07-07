const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.createTheater = async (req, res) => {
  const { name, location, cityId, total_seats } = req.body;
  const theaterId = uuidv4();
  const createdAt = new Date();
  const updatedAt = new Date();

  try {
    const [result] = await pool.query(
      `INSERT INTO theaters (theater_id, name, location, cityId, total_seats, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [theaterId, name, location, cityId, total_seats, createdAt, updatedAt]
    );

    res.status(201).json({
      message: "Theater created successfully",
      theaterId: theaterId,
    });
  } catch (error) {
    console.error("Error creating theater:", error);
    res.status(500).json({ error: "Failed to create theater" });
  }
};
// update theater
exports.updateTheater = async (req, res) => {
  const { theaterId } = req.params;
  const { name, location, cityId, total_seats } = req.body;
  const updatedAt = new Date();

  try {
    const [result] = await pool.query(
      `UPDATE theaters SET name=?, location=?, cityId=?, total_seats=?, updated_at=? WHERE theater_id=?`,
      [name, location, cityId, total_seats, updatedAt, theaterId]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({
        message: `Theater with ID ${theaterId} updated successfully`,
      });
    } else {
      res.status(404).json({ error: `Theater with ID ${theaterId} not found` });
    }
  } catch (error) {
    console.error("Error updating theater:", error);
    res.status(500).json({ error: "Failed to update theater" });
  }
};
// get theaters in particular city
exports.getTheatersByCity = async (req, res) => {
  const { cityId } = req.params;

  try {
    const [rows] = await pool.query(`SELECT * FROM theaters WHERE cityId = ?`, [
      cityId,
    ]);
    res.status(200).json({ theaters: rows });
  } catch (error) {
    console.error("Error fetching theaters:", error);
    res.status(500).json({ error: "Failed to fetch theaters" });
  }
};
