const mongoose = require("mongoose");
const user = require("./user.model");
const bcrypt = require("bcryptjs");
const accountSchema = mongoose.Schema(
	{
		user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true,"Account must have associated to a user"],
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
        PIN : {
            type: Number,
            required: [true, "password is empty"],
            length: [4, "invalid password, minimum length of password is 4"],
            trim: true,
            select: false,
        },
	},
	{
		timestamps: true,
	},
);

const account = mongoose.model("account", accountSchema);
module.exports = account;