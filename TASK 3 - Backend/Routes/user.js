const express = require("express");
const router = express.Router();

const userControllers = require("../Controllers/user");
const blogControllers = require("../Controllers/blog");
const { isUserLoggedIn } = require("../Middlewares/isUserLogin");

// USER

router.route("/user/create").post(userControllers.createUser);
router.route("/user/login").post(userControllers.loginUser);
router.route("/user/details").get(isUserLoggedIn, userControllers.getUser);

// POST
router.route("/blog/create").post(isUserLoggedIn, blogControllers.createBlog);
router.route("/blog/delete").post(isUserLoggedIn, blogControllers.deleteBlog);
router.route("/blog/update").post(isUserLoggedIn, blogControllers.updateBlog);
router.route("/blog/details").get(blogControllers.getBlog);
router
  .route("/user/blog/all")
  .get(isUserLoggedIn, blogControllers.getUserBlogs);

module.exports = router;
