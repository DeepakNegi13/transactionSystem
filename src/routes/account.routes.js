const account = require("../Models/account.model");
const sendEmail = require("../services/email.services");
const express = require("express");
const accountRouter = express.Router();
const accountController = require("../controllers/account.controllers");

/**
 * Post route to create a new account. Expects the following fields in the request body:
 * - AccountHolder: The ID of the user who will hold the account (required).
 * - type: The type of account, either "savings" or "current" (required).
 * - PIN: The PIN for the account (required).
 * - balance: The initial balance for the account (optional).
 * - AccountNumber: The account number (optional, will be automatically generated).
 * - Api endpoint: POST /api/account/create
 */
accountRouter.post("/create", async (req, res) => {
    await accountController(req, res);
});
module.exports = accountRouter;