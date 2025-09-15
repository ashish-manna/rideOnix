const jwt = require("jsonwebtoken");
const Captain = require("../models/captain");

const captainAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error(`Invalid token`);
    }
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById(_id);
    if (!captain) {
      throw new Error(`Unauthorized captain`);
    }
    req.captain = captain;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message || `Server Error` });
  }
};

module.exports = captainAuth;
