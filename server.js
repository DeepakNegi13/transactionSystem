require("dotenv").config()
const app = require("./src/app");
const mongoose = require("./src/config/db");

mongoose();
app.listen(3000, (e) => {
	console.log("server is started");
});
