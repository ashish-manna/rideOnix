const validator = require("validator");

const userDataValidation = (req) => {
  const { firstName, email, password } = req.body;

  if (!firstName || !email || !password) {
    throw new Error(`All feilds are required`);
  }
  if (!validator.isEmail(email)) {
    throw new Error(`Email is invalid`);
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error(`Enterd password is too weak`);
  }
};

module.exports = { userDataValidation };
