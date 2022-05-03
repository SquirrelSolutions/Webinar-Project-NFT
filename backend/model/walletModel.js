const mongoose = require("mongoose");

const walletSchema = mongoose.Schema(
	{
		address: {
			type: String,
			required: [true, "Please send a valid wallet address"],
		},
		name: {
			type: String,
			required: [true, "Please send a valid name"],
		},
		email: {
			type: String,
			required: [true, "Please send a valid email address"],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Wallet", walletSchema);
