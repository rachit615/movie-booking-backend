const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.createMovieBooking = async (req, res) => {
  const { user_id, showtime_id, seats, total_amount } = req.body;
  const booking_id = uuidv4();
  const booking_date = new Date();

  try {
    // Check if seats are already booked for the given showtime
    for (const seat_id of seats) {
      const [results] = await pool.query(
        `SELECT COUNT(*) as count FROM bookedseats bs
         JOIN bookings b ON bs.booking_id = b.booking_id
         WHERE b.showtime_id = ? AND bs.seat_id = ?`,
        [showtime_id, seat_id]
      );

      if (results[0].count > 0) {
        return res.status(400).json({
          error: `Seat ${seat_id} is already booked for the selected showtime`,
        });
      }
    }

    // Create a booking
    await pool.query(
      `INSERT INTO bookings (booking_id, user_id, showtime_id, total_amount, booking_date, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        booking_id,
        user_id,
        showtime_id,
        total_amount,
        booking_date,
        "CONFIRMED",
      ]
    );

    // Add booked seats
    for (const seat_id of seats) {
      await pool.query(
        `INSERT INTO bookedseats (booking_id, seat_id) VALUES (?, ?)`,
        [booking_id, seat_id]
      );
    }

    res.status(201).json({
      message: "Booking created successfully",
      booking_id,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
};
