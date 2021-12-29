const mongoose = require("mongoose");
const dbURL = process.env.DB_URL;
module.exports = () => {
	mongoose
		.connect(dbURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.info(`Mongoose default connection is open to ${dbURL} ✅`);
		})
		.catch((err) => {
			console.log(err)
			console.error("Unable to connect to data base ❌");
		});
	mongoose.connection.on("disconnected", function () {
		console.warn("Mongoose default connection is disconnected ❗");
	});
};
