const account = require("../Models/account.model");
const registeredUser = require("../Models/user.model");

async function createAccount(req, res) {
	const { userID, password, PIN, type = "savings" } = req.body;

	try {
		if (!userID || !password || !PIN) {
			return res.status(400).json({
				message: "userID, password, and PIN are required",
			});
		}

		const userExist = await registeredUser
			.findOne({ userID })
			.select("+password");

		if (!userExist) {
			return res.status(404).json({
				message: "User not registered yet. Please register first.",
			});
		}

		if (!(await userExist.comparePassword(password))) {
            return res.status(401).json({
				message: "Wrong password",
            });
		}

		const newAccount = await account.create({
			user: userExist._id,
			type,
			AccountNumber: Math.floor(
				1000000000 + Math.random() * 900000000,
			),
			PIN: String(PIN),
		});

		return res.status(201).json({
			status: "success",
			data: newAccount,
		});
	} catch (error) {
		console.error("Account creation failed:", error.message);
		return res.status(400).json({
			status: "fail",
			message: error.message,
		});
	}
}

module.exports = createAccount;
