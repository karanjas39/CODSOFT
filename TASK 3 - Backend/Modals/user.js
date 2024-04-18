const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: "String",
    default: "",
  },
  email: {
    type: String,
    default: "",
    unique: true,
  },
  password: {
    type: String,
    default: "",
    select: false,
  },
  username: {
    type: String,
    default: "",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: {
    type: String,
    default: "",
  },
  resetPasswordExpiry: {
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

const user = mongoose.model("user", schema);

module.exports = user;
