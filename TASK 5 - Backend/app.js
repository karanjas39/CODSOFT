const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const userRouter = require("./ROUTES/user.route");

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
app.use(express.static(path.join(__dirname, "PUBLIC")));
app.use(express.json({ limit: "12kb" }));
app.use(express.urlencoded({ extended: true, limit: "12kb" }));

app.route("/").get((req, res) => {
  res.send({
    success: true,
    status: 200,
    message: "This is the backend of QUIZEO - A Quiz taking Platform.",
  });
});

// ROUTES
app.use("/v1/api/user", cors(), userRouter);

// UNHANDLED ROUTES
app.route("*").all((req, res) => {
  res.send({
    success: false,
    message: "",
  });
});

module.exports = app;
