const mongoose = require("mongoose");

const quizCreateSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
  },
  passScore: {
    type: Number,
  },
  mcq: [
    {
      question: {
        type: String,
        required: true,
      },
      options: {
        type: [String],
        required: true,
        validate: {
          validator: function (v) {
            return v.length >= 2;
          },
          message: "At least two options are required for MCQ.",
        },
      },
      answer: {
        type: Number,
        required: true,
        validate: {
          validator: function (v) {
            return Number.isInteger(v) && v >= 0 && v < this.options.length;
          },
          message: "Invalid answer index.",
        },
        select: false,
      },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

const quizCreate = mongoose.model("QuizCreated", quizCreateSchema);

module.exports = quizCreate;
