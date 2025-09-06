const Captain = require("../models/captain");
const bcrypt = require("bcrypt");
const { userDataValidation } = require("../utils/validations");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const captainRegister = async (req, res) => {
  try {
    userDataValidation(req);
    const { firstName, lastName, email, password } = req.body;
    const isExist = await Captain.findOne({ email: email });
    if (isExist) {
      throw new Error(`Captian already exist`);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const captain = new Captain({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    await captain.save();
    res.status(200).json({ message: `New user account created!!..` });
  } catch (err) {
    res.status(401).json({ message: err.message || "Something went wrong" });
  }
};

const captainLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error(`Email and Password is required`);
    }
    if (!validator.isEmail(email)) {
      throw new Error(`Email is not valid`);
    }
    const captain = await Captain.findOne({ email: email }).select("+password");
    if (!captain) {
      throw new Error(`Email or Password is invalid`);
    }
    const isValidPassword = await bcrypt.compare(password, captain.password);
    if (!isValidPassword) {
      throw new Error(`Email or Password is invalid`);
    }
    const token = jwt.sign({ _id: captain._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(200).json(captain);
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid Credentials..." });
  }
};

const captainLogout = (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.status(200).json({ message: `Captain logged out successfullly` });
};

module.exports = { captainRegister, captainLogin, captainLogout };
