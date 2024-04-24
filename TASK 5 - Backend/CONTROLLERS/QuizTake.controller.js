const QuizTake = require("../MODELS/QuizTake.model");
const QuizCreate = require("../MODELS/QuizCreate.model");
const User = require("../MODELS/User.model");

module.exports = { createQuizTake, getQuizTake };

async function createQuizTake(req, res) {
  try {
    // mcq =[{solution:1,_id:"6628042d94d71a4dbnsi2b49"}]

    const { quizId, mcq } = req.body;
    const { id } = req;

    if (!quizId || !Array.isArray(mcq)) {
      return res.send({
        success: false,
        status: 400,
        message: "Quiz ID is required and mcq should be an array.",
      });
    }

    const isUser = await User.findById(id);

    if (!isUser || !isUser.verified || isUser.role !== "taker") {
      return res.send({
        success: false,
        status: 403,
        message:
          "Unauthorized access. You do not have the necessary permissions.",
      });
    }

    const quiz = await QuizCreate.findById(quizId).select("+mcq.answer");
    if (!quiz || quiz.active == false) {
      return res.send({
        success: false,
        status: 404,
        message: "Quiz not found.",
      });
    }

    const isTaker = await QuizTake.findOne({ quizId, takenBy: id });

    let score = 0;

    mcq.forEach((answer) => {
      const question = quiz.mcq.find((ques) => ques._id.equals(answer._id));
      if (question && question.answer === answer.solution) {
        score++;
      }
    });

    const passMessage =
      score >= quiz.passScore
        ? "Congratulations! You have passed the quiz."
        : "Well done! Better luck next time.";

    if (!isTaker) {
      const newQuizTake = await QuizTake.create({
        takenBy: id,
        quizId,
        score: [score],
        pass: score >= quiz.passScore,
      });

      if (!newQuizTake) {
        return res.send({
          success: false,
          status: 500,
          message: "Failed to save quiz take data. Please try again later.",
        });
      }

      return res.send({
        success: true,
        status: 200,
        message: passMessage,
        score,
      });
    }

    isTaker.attempt++;
    isTaker.score.push(score);
    if (!isTaker.pass) {
      isTaker.pass = score >= quiz.passScore;
    }
    await isTaker.save();

    res.send({
      success: true,
      status: 200,
      message: passMessage,
      score,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()}`,
    });
  }
}

async function getQuizTake(req, res) {
  try {
    const { _id } = req.query;

    if (!_id) {
      return res.send({
        success: false,
        status: 404,
        message: "Quiz ID is required and mcq should be an array.",
      });
    }

    const quizTake = await QuizTake.findById(_id)
      .populate({
        path: "quizId",
        select: "title createdBy -_id mcq",
        populate: {
          path: "createdBy",
          select: "name  -_id",
        },
      })
      .populate({
        path: "takenBy",
        select: "name  -_id",
      })
      .select("quizId score takenBy attempt")
      .lean();

    const total = quizTake.quizId.mcq.length;

    const {
      takenBy,
      quizId: { title, createdBy },
      score,
      attempt,
    } = quizTake;

    if (!quizTake) {
      return res.send({
        success: false,
        status: 404,
        message: "Quiz not found.",
      });
    }

    res.send({
      success: true,
      status: 200,
      quiz: { takenBy, total, title, createdBy, score, attempt },
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()}`,
    });
  }
}
