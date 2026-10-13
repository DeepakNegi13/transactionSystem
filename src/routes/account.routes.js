const express = require("express");
const accountRouter = express.Router();
const accountController = require("../controllers/account.controllers");

/**
 * Post route to create a new account. Expects the following fields in the request body:
 * - userID: The ID of the registered user (required).
 * - password: The user's password (required).
 * - type: The type of account, either "savings" or "current" (optional).
 * - PIN: A four-digit PIN (required).
 * - AccountNumber: Generated automatically.
 * - Api endpoint: POST /api/account/create
 */
accountRouter.post("/create", accountController);

module.exports = accountRouter;
