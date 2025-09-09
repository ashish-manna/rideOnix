const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error(`Invalid token`);
    }
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(_id);
    if (!user) {
      throw new Error(`Unauthorized user`);
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message || `Server Error` });
  }
};

module.exports = userAuth;
