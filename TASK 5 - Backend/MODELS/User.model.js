const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    select: false,
  },
  role: {
    type: String,
    enum: ["creator", "taker"],
  },
  otp: {
    type: String,
    default: "",
  },
  otpCreatedAt: {
    type: Date,
    default: null,
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

const user = mongoose.model("User", userSchema);

module.exports = user;
