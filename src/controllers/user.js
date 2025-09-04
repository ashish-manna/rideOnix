const User = require("../models/user");
const { userDataValidation } = require("../utils/validations");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  try {
    userDataValidation(req);
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    await user.save();
    res.status(200).json({ message: `New user account created!!..` });
  } catch (err) {
    res.status(401).json({ message: err.message || "Something went wrong" });
  }
};

module.exports = { userRegister };
