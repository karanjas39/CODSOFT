const QuizCreate = require("../MODELS/QuizCreate.model");
const User = require("../MODELS/User.model");

module.exports = { createQuiz, updateQuizCreated, deleteQuizCreated, getQuiz };

async function createQuiz(req, res) {
  try {
    const { title, description, passScore, difficulty, mcq } = req.body;
    const { id } = req;

    if (
      !title ||
      !description ||
      !passScore ||
      !difficulty ||
      !mcq ||
      mcq.length < 5
    ) {
      return res.send({
        success: false,
        status: 404,
        message:
          "All fields are required, and there should be at least 5 questions in the quiz.",
      });
    }

    const isUser = await User.findById(id);

    if (!isUser || !isUser.verified || isUser.role !== "creator") {
      return res.send({
        success: false,
        status: 404,
        message:
          "Unauthorized access. You do not have the necessary permissions.",
      });
    }

    const isTitleValid =
      title.split(" ").length >= 2 && title.split(" ").length <= 5;

    if (!isTitleValid) {
      return res.send({
        success: false,
        status: 404,
        message: "Quiz title length should be between 2 and 5 words.",
      });
    }

    const isDescriptionValid =
      description.split(" ").length >= 5 &&
      description.split(" ").length <= 100;

    if (!isDescriptionValid) {
      return res.send({
        success: false,
        status: 404,
        message: "Quiz description length should be between 5 and 100 words.",
      });
    }

    const isDifficultyValid = ["easy", "medium", "hard"].includes(difficulty);

    if (!isDifficultyValid) {
      return res.send({
        success: false,
        status: 404,
        message: "Quiz difficulty level is not valid.",
      });
    }

    const isPassScoreValid =
      !isNaN(passScore) && passScore > 0 && passScore <= mcq.length;

    if (!isPassScoreValid) {
      return res.send({
        success: false,
        status: 404,
        message:
          "Pass score should be a positive integer less than or equal to the total number of questions.",
      });
    }

    const newQuiz = await QuizCreate.create({
      title,
      description,
      passScore: Number(passScore),
      mcq,
      createdBy: id,
    });

    return res.send({
      success: true,
      status: 200,
      message: "Quiz created successfully.",
      quiz: newQuiz._id,
    });
  } catch (error) {
    return res.send({
      success: false,
      status: 500,
      message: `An internal server error occurred: ${error.toString()}`,
    });
  }
}

async function updateQuizCreated(req, res) {
  try {
    const { title, description, passScore, difficulty, _id, mcq } = req.body;
    const { id } = req;

    if (!_id) {
      return res.send({
        success: false,
        status: 400,
        message: "Quiz ID is required for updating the quiz.",
      });
    }

    const quiz = await QuizCreate.findById(_id);
    if (!quiz) {
      return res.send({
        success: false,
        status: 404,
        message: "Quiz not found.",
      });
    }

    if (!quiz.createdBy.equals(id)) {
      return res.send({
        success: false,
        status: 404,
        message:
          "Unauthorized access. You do not have the necessary permissions.",
      });
    }

    if (title) {
      const isTitleValid =
        title.split(" ").length >= 2 && title.split(" ").length <= 5;
      if (!isTitleValid) {
        return res.send({
          success: false,
          status: 400,
          message: "Quiz title length should be between 2 and 5 words.",
        });
      }
      quiz.title = title;
    }

    if (description) {
      const isDescriptionValid =
        description.split(" ").length >= 5 &&
        description.split(" ").length <= 100;
      if (!isDescriptionValid) {
        return res.send({
          success: false,
          status: 400,
          message: "Quiz description length should be between 5 and 100 words.",
        });
      }
      quiz.description = description;
    }

    if (passScore) {
      if (mcq && mcq.length > 0) {
        const isPassScoreValid =
          !isNaN(passScore) && passScore > 0 && passScore <= mcq.length;
        if (!isPassScoreValid) {
          return res.send({
            success: false,
            status: 400,
            message:
              "Pass score should be a positive integer less than or equal to the total number of questions.",
          });
        }
      } else {
        const isPassScoreValid =
          !isNaN(passScore) && passScore > 0 && passScore <= quiz.mcq.length;
        if (!isPassScoreValid) {
          return res.send({
            success: false,
            status: 400,
            message:
              "Pass score should be a positive integer less than or equal to the total number of questions.",
          });
        }
      }
      quiz.passScore = passScore;
    }

    if (difficulty) {
      const isDifficultyValid = ["easy", "medium", "hard"].includes(difficulty);
      if (!isDifficultyValid) {
        return res.send({
          success: false,
          status: 400,
          message: "Quiz difficulty level is not valid.",
        });
      }
      quiz.difficulty = difficulty;
    }

    if (mcq) {
      if (!Array.isArray(mcq)) {
        return res.send({
          success: false,
          status: 400,
          message: "MCQ must be an array of objects.",
        });
      }
      // if (mcq.length < 5) {
      //   return res.send({
      //     success: false,
      //     status: 400,
      //     message: "There should be at least 5 questions in the quiz.",
      //   });
      // }

      for (const question of mcq) {
        if (
          !question.question ||
          !question.options ||
          !Array.isArray(question.options) ||
          question.options.length < 2 ||
          !(
            Number.isInteger(question.answer) &&
            question.answer >= 0 &&
            question.answer < question.options.length
          )
        ) {
          return res.send({
            success: false,
            status: 400,
            message:
              "Each question must contain a question text, options array with at least 2 options, and an answer index.",
          });
        }
      }

      if (!passScore && mcq.length < quiz.passScore) {
        return res.send({
          success: false,
          status: 400,
          message:
            "Update Pass score also as per total number of questions in the quiz.",
        });
      }

      quiz.mcq = mcq;
    }

    quiz.updatedAt = Date.now();
    await quiz.save();

    return res.send({
      success: true,
      status: 200,
      message: "Quiz updated successfully.",
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()}`,
    });
  }
}

async function deleteQuizCreated(req, res) {
  try {
    const { _id } = req.body;
    const { id } = req;

    if (!_id) {
      return res.send({
        success: false,
        status: 400,
        message: "Quiz ID is required for updating the quiz.",
      });
    }

    const quiz = await QuizCreate.findById(_id);
    if (!quiz) {
      return res.send({
        success: false,
        status: 404,
        message: "Quiz not found.",
      });
    }

    if (!quiz.createdBy.equals(id)) {
      return res.send({
        success: false,
        status: 404,
        message:
          "Unauthorized access. You do not have the necessary permissions.",
      });
    }

    // TODO
    // ACTIVE:FALSE FOR PEOPLE WHO TOOK THIS QUIZ

    await QuizCreate.findByIdAndUpdate({ _id: _id }, { active: false });

    res.send({
      success: true,
      status: 200,
      message: "Quiz is deleted successfully.",
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()}`,
    });
  }
}

async function getQuiz(req, res) {
  try {
    const { _id } = req.query;
    if (!_id) {
      return res.send({
        success: false,
        status: 400,
        message: "Quiz ID is required for updating the quiz.",
      });
    }

    const quiz = await QuizCreate.findById(_id)
      .select("-active -_id -updatedAt -mcq._id")
      .populate({
        path: "createdBy",
        select: "name email -_id",
      });
    if (!quiz) {
      return res.send({
        success: false,
        status: 404,
        message: "Quiz not found.",
      });
    }

    res.send({
      success: true,
      status: 200,
      quiz,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()}`,
    });
  }
}
