const express = require("express");
const jwt = require("jsonwebtoken");
const user = require("../Models/user.model");
const authRouter = express.Router();
const authController = require("../controllers/auth.controllers");

// user Register router
// /api/auth/register
authRouter.post("/register", authController.register);

// user Login router
// /api/auth/login
authRouter.post("/login", authController.login);

module.exports = authRouter;
