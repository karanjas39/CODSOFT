const express = require("express");
const router = express.Router();

const userControllers = require("../CONTROLLERS/User.controller");
const { isUserLoggedIn } = require("../MIDDLEWARES/isLoggedIn.middleware");

// USER
router.route("").get(isUserLoggedIn, userControllers.getUser);
router.route("/create").post(userControllers.createUser);
router.route("/login").post(userControllers.loginUser);
router
  .route("/account/verification/start")
  .get(isUserLoggedIn, userControllers.sendOTPToVerifyEmail);
router
  .route("/account/verification/end")
  .post(isUserLoggedIn, userControllers.verifyOTP);

module.exports = router;
