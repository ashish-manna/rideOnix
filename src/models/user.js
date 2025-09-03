const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 40,
    minLength: 4,
  },
  lastName: {
    type: String,
    maxLength: 40,
    minLength: 4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
