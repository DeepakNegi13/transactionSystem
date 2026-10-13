const express = require("express");
const jwt = require("jsonwebtoken");
const user = require("../Models/user.model");
const authController = require("../controllers/auth.controllers");
const authRouter = express.Router();

// user Register router
// /api/auth/register
authRouter.post("/register", async (req, res) => {
    await authController.register(req, res);
});

// user Login router
// /api/auth/login
authRouter.post("/login", async (req, res) => {
    await authController.login(req, res);
});

module.exports = authRouter;
