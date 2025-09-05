const User = require("../models/user");
const { userDataValidation } = require("../utils/validations");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  try {
    userDataValidation(req);
    const { firstName, lastName, email, password } = req.body;
    const isExist = await User.findOne({ email: email });
    if (isExist) {
      throw new Error(`User already exist`);
    }
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

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error(`Email and Password is required`);
    }
    if (!validator.isEmail(email)) {
      throw new Error(`Email is not valid`);
    }
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      throw new Error(`Email or Password is invalid`);
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error(`Email or Password is invalid`);
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid Credentials..." });
  }
};

const userLogout = async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.status(200).json({ message: `User logout successfully` });
};

module.exports = { userRegister, userLogin, userLogout };
