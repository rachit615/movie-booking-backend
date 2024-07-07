const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.createScreenLayout = async (req, res) => {
  const { theater_id } = req.params;
  const { screen_name, rows, max_seat_id, min_seat_id } = req.body;
  const screen_id = uuidv4();

  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Insert screen information
    await pool.query(
      `INSERT INTO screens (screen_id, theater_id, name, max_seat_id, min_seat_id) VALUES (?, ?, ?, ?, ?)`,
      [screen_id, theater_id, screen_name, max_seat_id, min_seat_id]
    );

    for (const row of rows) {
      const { grid_row_id, phy_row_id, area_id, seats } = row;
      const row_id = uuidv4();

      // Insert row information with screen_id and predefined area_id
      await pool.query(
        `INSERT INTO \`rows\` (row_id, screen_id, grid_row_id, phy_row_id, area_id) VALUES (?, ?, ?, ?, ?)`,
        [row_id, screen_id, grid_row_id, phy_row_id, area_id]
      );

      for (const seat of seats) {
        const {
          grid_seat_num,
          seat_status,
          x_pos,
          str_seat_num,
          seat_num,
          display_seat_number,
          type,
        } = seat;
        const seat_id = uuidv4();

        // Insert seat information
        await pool.query(
          `INSERT INTO seats (seat_id, row_id, grid_seat_num, seat_status, x_pos, str_seat_num, seat_num, display_seat_number, type)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            seat_id,
            row_id,
            grid_seat_num,
            seat_status,
            x_pos,
            str_seat_num,
            seat_num,
            display_seat_number,
            type,
          ]
        );
      }
    }

    await connection.commit();
    res
      .status(201)
      .json({ message: "Screen layout created successfully", screen_id });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error("Error creating screen layout:", error);
    res.status(500).json({ error: "Failed to create screen layout" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
