// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");

//mail backend
const cookieParser = require("cookie-parser");

// Import routes
const clientsRouter = require("./routes/clients-route");

// Set default port for express app
const PORT = process.env.PORT || 4001;

// Create express app
const app = express();

//mail backend
const nodemailer = require("nodemailer");
const mail = require("./mail.js");

// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//implement email route
app.use("/email", mail);
// Implement clients route
app.use("/clients", clientsRouter);

// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something is broken.");
});

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send("Sorry we could not find that.");
});

//mail backend
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Start express app
app.listen(PORT, function () {
  console.log(`Server is running on: ${PORT}`);
});
