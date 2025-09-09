const express = require("express");
const {
  userRegister,
  userLogin,
  userLogout,
  userProfile,
} = require("../controllers/user");
const userAuth = require("../middlewares/userAuth");
const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);
userRouter.get("/profile/view", userAuth, userProfile);

module.exports = userRouter;
