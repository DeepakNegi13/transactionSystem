const express = require("express");
const jwt = require("jsonwebtoken");
const user = require("../Models/user.model");
const authRouter = express.Router();
authRouter.post("/register", async (req, res) => {
	const { name, userID, email, password } = req.body;

	try {
		const newAccount = await user.create({
			name,
			userID,
			email,
			password,
		});
        const token = jwt.sign(
            {
                id:newAccount._id
            },
            process.env.JWT_SECRET
        );
        res.cookie("token", token);

		res.status(201).json({
			status: "success",
			data: newAccount,
            token,
		});

        

	} catch (error) {
		console.error("Registration failed:", error.message);
		return res.status(400).json({
			status: "fail",
			message: error.message,
		});
	}
});

module.exports = authRouter;
