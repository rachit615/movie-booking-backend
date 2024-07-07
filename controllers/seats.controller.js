const pool = require("../config/db");

exports.selectSeatLayout = async (req, res) => {
  const { showtime_id } = req.params;

  try {
    // Fetch max and min seat IDs from the screens table
    const [screenResult] = await pool.query(
      `SELECT sc.max_seat_id, sc.min_seat_id 
       FROM screens sc
       JOIN showtimes st ON sc.screen_id = st.screen_id
       WHERE st.showtime_id = ?`,
      [showtime_id]
    );

    if (screenResult.length === 0) {
      return res.status(404).json({ error: "Showtime or screen not found" });
    }

    const { max_seat_id: intMaxSeatId, min_seat_id: intMinSeatId } =
      screenResult[0];

    // Fetch seat layout and booking status
    const [seats] = await pool.query(
      `SELECT 
        a.area_id AS AreaNum,
        a.area_desc AS AreaDesc,
        r.grid_row_id AS GridRowId,
        r.phy_row_id AS PhyRowId,
        s.seat_id,
        s.grid_seat_num AS GridSeatNum,
        s.seat_num AS seatNumber,
        s.display_seat_number AS displaySeatNumber,
        COALESCE(b.status, '0') AS SeatStatus
      FROM seats s
      JOIN \`rows\` r ON s.row_id = r.row_id
      JOIN areas a ON r.area_id = a.area_id
      LEFT JOIN bookedseats bs ON s.seat_id = bs.seat_id
      LEFT JOIN bookings b ON bs.booking_id = b.booking_id AND b.showtime_id = ?
      ORDER BY a.area_id, r.grid_row_id, s.grid_seat_num`,
      [showtime_id]
    );

    // Organize the data into the desired format
    const colAreas = {
      intMaxSeatId: intMaxSeatId,
      intMinSeatId: intMinSeatId,
      objArea: [],
    };

    const areaMap = new Map();

    seats.forEach((seat) => {
      if (!areaMap.has(seat.AreaNum)) {
        areaMap.set(seat.AreaNum, {
          AreaNum: seat.AreaNum,
          AreaDesc: seat.AreaDesc,
          objRow: [],
        });
      }

      const area = areaMap.get(seat.AreaNum);

      let row = area.objRow.find((r) => r.GridRowId === seat.GridRowId);
      if (!row) {
        row = {
          GridRowId: seat.GridRowId,
          PhyRowId: seat.PhyRowId,
          objSeat: [],
        };
        area.objRow.push(row);
      }

      row.objSeat.push({
        GridSeatNum: seat.GridSeatNum,
        SeatStatus: seat.SeatStatus === "confirmed" ? "1" : "0",
        seatNumber: seat.seatNumber,
        displaySeatNumber: seat.displaySeatNumber,
      });
    });

    // forEach ends here

    colAreas.objArea = Array.from(areaMap.values());
    console.log("colAreas", colAreas);
    res.status(200).json({ seatLayout: colAreas });
  } catch (error) {
    console.error("Error fetching seat layout:", error);
    res.status(500).json({ error: "Failed to fetch seat layout" });
  }
};
