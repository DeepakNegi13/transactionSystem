const mongoose = require("mongoose");
require("dotenv").config();
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

function connectToDb() {
	mongoose
		.connect(process.env.MONGODB_URI)
		.then(() => {
			console.log("connect to Data base");
		})
		.catch((e) => {
			console.error("MongoDB connection failed:", e.message);
			process.exit(1);
		});
}
module.exports = connectToDb;
