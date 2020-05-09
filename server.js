// require express
const express = require("express");
const path = require("path");
let tableData = require("./data/tables");
let waitlistData = require("./data/waiting");

// set up express app and port
const app = express();
const PORT = process.env.PORT || 3000;

// handle parsing data for POST requests
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// set up routes to handle requests
// root route (home)
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
});

// view tables route (GET)
app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "public/tables.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "public/reserve.html"));
});

// api table route (GET)
app.get("/api/tables", function (req, res) {
    return res.json(tableData)
});

// api wait list route (GET)
app.get("/api/waitlist", function (req, res) {
    return res.json(waitlistData);
});

// add reservation (POST)
app.post("/api/tables", function (req, res) {
    var newReservation = req.body;
    console.log(newReservation);
    tableData.push(newReservation);
    res.json(newReservation);
});

// add waitlist (POST)
app.post("/api/waitlist", function (req, res) {
    var newReservation = req.body;
    console.log(newReservation);
    waitlistData.push(newReservation);
    res.json(newReservation);
});

// delete tables
app.delete("/api/tables", function(req, res) {
    tableData = [];
    console.log("Reservations and waitlist have been cleared");
});

// delete waitlist
app.delete("/api/waitlist", function (req, res) {
    waitlistData = [];
    console.log("Reservations and waitlist have been cleared");
});

// server is listening
app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}...`)
});


