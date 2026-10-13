const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const accountSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
			index: true,
		},
		type: {
			type: String,
			enum: ["savings", "current"],
			default: "savings",
		},
		AccountNumber: {
			type: Number,
			required: [true, "Account number is required"],
			unique: true,
		},
		PIN: {
			type: String,
			required: [true, "PIN is required"],
			minlength: [4, "PIN must contain 4 digits"],
			maxlength: [4, "PIN must contain 4 digits"],
			match: [/^\d{4}$/, "PIN must contain exactly 4 digits"],
			select: false,
		},
	},
	{
		timestamps: true,
	},
);
accountSchema.pre("save", async function (next) {
	if (!this.isModified("PIN")) {
		return next();
	}
	this.PIN = await bcrypt.hash(this.PIN, 10);
	next();
});

const account = mongoose.model("account", accountSchema);
module.exports = account;
