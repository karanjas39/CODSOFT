const QuizTake = require("../MODELS/QuizTake.model");
const QuizCreate = require("../MODELS/QuizCreate.model");
const User = require("../MODELS/User.model");

module.exports = { createQuizTake };

async function createQuizTake(req, res) {
  try {
    const { quizId, mcq } = req.body;
    const { id } = req;

    if (!quizId || (mcq && !Array.isArray(mcq))) {
      return res.send({
        success: false,
        status: 404,
        message: "Quiz is not submitted with all the parameters.",
      });
    }

    const isUser = await User.findById(id);

    if (!isUser || !isUser.verified || isUser.role !== "taker") {
      return res.send({
        success: false,
        status: 404,
        message:
          "Unauthorized access. You do not have the necessary permissions.",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()}`,
    });
  }
}
