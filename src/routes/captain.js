const express = require("express");
const {
  captainRegister,
  captainLogin,
  captainLogout,
} = require("../controllers/captain");

const captainRouter = express.Router();

captainRouter.post("/register", captainRegister);
captainRouter.post("/login", captainLogin);
captainRouter.post("/logout", captainLogout);

module.exports = captainRouter;
