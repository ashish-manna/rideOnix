const express = require("express");
const { userRegister, userLogin, userLogout } = require("../controllers/user");
const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);

module.exports = userRouter;
