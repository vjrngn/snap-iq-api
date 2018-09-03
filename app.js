var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
// Setup environment variables
require("dotenv").config();
var passport = require("./config/passport");

const { DATABASE_HOST = "localhost", DATABASE_PORT = 27017 } = process.env;

mongoose.connect(
  `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/snap-iq-api`,
  function(error) {
    if (!error) {
      console.log("Successfully connected to monogoDb.");
    }
  }
);

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var registerRouter = require("./routes/register");

var app = express();

// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(passport.initialize());

app.use("/auth", authRouter);
app.use("/register", registerRouter);
app.use("/", passport.authenticate("jwt", { session: false }), indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;
