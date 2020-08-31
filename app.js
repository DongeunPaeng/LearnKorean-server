const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const registerEmail = require("./routes/registerEmail");
const usersRouter = require("./routes/users");
const unsubscribe = require("./routes/unsubscribe");

const app = express();

// view enging setup
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(helmet());
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "img-src 'self' https://images.unsplash.com data:"
  );
  return next();
});
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/registerEmail", registerEmail);
app.use("/api/users", usersRouter);
app.use("/api/unsubscribe", unsubscribe);

app.use(express.static(path.join(__dirname, "build")));

if (process.env.NODE_ENV === "production") {
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

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
  res.render("error");
});

module.exports = app;
