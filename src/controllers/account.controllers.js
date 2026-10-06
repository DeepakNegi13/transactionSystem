const account = require("../Models/account.model");
const sendEmail = require("../services/email.services");


async function createAccount(req, res) {
    const {user, PIN} = req.body;
    try {
        const newAccount = await account.create({
            user,
            // Generate a random 10-digit account number 
            AccountNumber: Math.floor(1000000000 + Math.random() * 9000000000), 
            PIN,   
        });
        console.log("Account created successfully:", newAccount);
        res.status(201).json({
            status: "Account created successfully",
            data: newAccount,
        });
    } catch (error) {
        console.error("Account creation failed:", error.message);
        return res.status(400).json({
            status: "Account creation failed",
            message: error.message,
        });
    }
}
module.exports = createAccount;


