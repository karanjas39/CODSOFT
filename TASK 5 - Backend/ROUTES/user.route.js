const express = require("express");
const router = express.Router();

const userControllers = require("../CONTROLLERS/User.controller");
const quizCreateControllers = require("../CONTROLLERS/QuizCreate.controller");
const quizTakeControllers = require("../CONTROLLERS/QuizTake.controller");
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

//  QUIZ TAKER
router.route("/quiz/detail").get(quizCreateControllers.getQuiz);
router
  .route("/quiz/take")
  .post(isUserLoggedIn, quizTakeControllers.createQuizTake);
router.route("/quiz/take/info").get(quizTakeControllers.getQuizTake);

//  QUIZ CREATOR
router.route("/quiz/all/user").get(quizCreateControllers.getAllQuizes);
router
  .route("/quiz/all")
  .get(isUserLoggedIn, quizCreateControllers.getUserAllQuiz);
router
  .route("/quiz/create")
  .post(isUserLoggedIn, quizCreateControllers.createQuiz);
router
  .route("/quiz/update")
  .post(isUserLoggedIn, quizCreateControllers.updateQuizCreated);
router
  .route("/quiz/delete")
  .post(isUserLoggedIn, quizCreateControllers.deleteQuizCreated);

router.all("*", (req, res) => {
  res.send({
    success: false,
    status: 404,
  });
});

module.exports = router;
