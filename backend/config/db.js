const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const username = process.env.username;
		const password = process.env.password;
		// console.log(username, password);
		const conn = await mongoose.connect(
			`mongodb+srv://${username}:${password}@cluster0.jjzta.mongodb.net/collectWallet?retryWrites=true&w=majority`
		);

		console.log(`MongoDb Connected: ${conn.connection.host}`.cyan.underline);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

module.exports = connectDB;
