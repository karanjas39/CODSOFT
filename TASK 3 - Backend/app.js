const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();

const userRouter = require("./Routes/user");

const whitelist = [process.env.CORS_ORIGIN_USER];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// CONFIGURATION
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "12kb" }));
app.use(express.urlencoded({ extended: true, limit: "12kb" }));
app.use(cookieParser());

// ROUTES
app.use("/v1/api", cors(), userRouter);

// UNHANDLED ROUTES
app.route("*").all((req, res) => {
  res.send({
    success: false,
    message: "",
  });
});

module.exports = app;
