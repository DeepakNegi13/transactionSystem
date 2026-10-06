const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const account = require("./Models/user.model");
const authRouter = require("./routes/auth.routes");
const accountRouter = require("./routes/account.routes");

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/account", accountRouter);


module.exports = app;
