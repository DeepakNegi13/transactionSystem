const express = require("express");
const jwt = require("jsonwebtoken");
const user = require("../Models/user.model");
const authRouter = express.Router();

// user Register router
// /api/auth/register
authRouter.post("/register", async (req, res) => {
    await authController(req, res);
});

// user Login router
// /api/auth/login
authRouter.post("/login", async (req, res) => {
    await authController(req, res);
});

module.exports = authRouter;
