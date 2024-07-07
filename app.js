const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// Use built-in middleware to parse JSON
app.use(express.json());
app.use(bodyParser.json());

// Set view engine
app.set("view engine", "pug");

// Define routes
app.get("/", function (req, res) {
  res.send("message");
});

const theatersRoute = require("./routes/theaters.routes");
const citiesRoute = require("./routes/cities.routes");
const screensRoute = require("./routes/screens.routes");
const moviesRoute = require("./routes/movies.routes");
const showTimesRoute = require("./routes/showtimes.routes");
const bookingsRoute = require("./routes/bookings.routes");
const seatsRoute = require("./routes/seats.routes");

app.use(theatersRoute);
app.use(citiesRoute);
app.use(screensRoute);
app.use(moviesRoute);
app.use(showTimesRoute);
app.use(bookingsRoute);
app.use(seatsRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`Node server is running on port ${PORT}..`);
});
