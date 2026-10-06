const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, "name is incomplete"],
		},
		userID: {
			type: String,
			trim: true,
			required: [true, "name is incomplete"],
			unique: [true, "please fill a unique user ID"],
		},
		email: {
			type: String,
			required: [true, "email is necessary to create user account"],
			unique: [true, "already have an account"],
			trim: true,
			lowercase: true,
			match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
		},

		password: {
			type: String,
			required: [true, "password is empty"],
			minlength: [
				10,
				"invalid password, minimum length of password is 10",
			],
			trim: true,
			select: false,
		},
	},
	{
		timestamps: true,
	},
);

//function start before saving the user data
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return ;
	}

	try {
		this.password = await bcrypt.hash(this.password, 10);
		return ;
	} catch (error) {
		return next(error);
	}
});


/**
 * - Compare the provided password with the stored hashed password
 * - api/auth/login
 */
userSchema.methods.comparePassword = async function (Password) {
	return await bcrypt.compare(Password, this.password);
};

const user = mongoose.model("user", userSchema);
module.exports = user;
