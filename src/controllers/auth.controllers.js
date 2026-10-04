const jwt = require("jsonwebtoken");
const user = require("../Models/user.model");
const sendEmail = require("../services/email.services");

/**
 * -user Register controller
 * -api/auth/register
 */
async function register(req, res) {
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
				id: newAccount._id,
			},
			process.env.JWT_SECRET,
		);
		res.cookie("token", token);

		res.status(201).json({
			status: "success",
			data: newAccount,
			token,
		});

		// Send welcome email to our new registered user
		await sendEmail(email, name);

	} catch (error) {
		console.error("Registration failed:", error.message);
		return res.status(400).json({
			status: "fail",
			message: error.message,
		});
	}
};


/**
 * -user Login controller
 * -api/auth/login
 */
async function login(req, res) {
	const { email, password } = req.body;
	const foundUser = await user.findOne({ email }).select("+password");
	if (!foundUser) {
		return res.status(404).json({
			message: "User not found",
		});
	}
	if (!(await foundUser.comparePassword(password))) {
		return res.status(401).json({
			message: "Invalid password",
		});
	}
	const token = jwt.sign(
		{
			id: foundUser._id,
		},
		process.env.JWT_SECRET,
	);
	res.cookie("token", token);

	return res.status(200).json({
		status: "login successfully",
		token,
	});
};

module.exports = {
    register,
    login,
};