const mongoose = require("mongoose");

const captainSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 40,
      minLength: 4,
      trim: true,
    },
    lastName: {
      type: String,
      maxLength: 40,
      minLength: 4,
      trim: true,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    socketId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Captain = mongoose.model("Captain", captainSchema);

module.exports = Captain;
