const mongoose = require("mongoose");

const quizTakeSchema = mongoose.Schema({
  takenBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuizCreated",
    default: null,
  },
  score: [Number],
  pass: {
    type: Boolean,
    default: false,
  },
  attempt: {
    type: Number,
    default: 1,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const quizTake = mongoose.model("quizTake", quizTakeSchema);

module.exports = quizTake;
