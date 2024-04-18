const express = require("express");
const router = express.Router();

const userControllers = require("../Controllers/user");
const { isUserLoggedIn } = require("../Middlewares/isUserLogin");

router.route("/user/create").post(userControllers.createUser);
router.route("/user/login").post(userControllers.loginUser);

router.route("/user/details").get(isUserLoggedIn, userControllers.getUser);

module.exports = router;
