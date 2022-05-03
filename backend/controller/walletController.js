const asyncHandler = require("express-async-handler");

const Wallet = require("../model/walletModel");

const getWallet = asyncHandler(async (req, res) => {
	const wallet = await Wallet.find({});
	res.status(200).json(wallet);
});

const setWallet = asyncHandler(async (req, res) => {
	if (!req.body.address) {
		res.status(400)
		throw new Error("Please add a valid wallet address");
	}

	if (!req.body.name) {
		res.status(400)
		throw new Error("No, name sent. Please send a name");
	}

	if (!req.body.email) {
		res.status(400)
		throw new Error("Email field was sent empty");
	}

	const existAddress = await Wallet.find({ address: req.body.address });
	console.log(existAddress);
	if (existAddress.length > 0) {
		res.status(403)
		throw new Error("You have already sent your address");
	}

	const existEmail = await Wallet.find({ email: req.body.email });
	console.log(existEmail);
	if (existEmail.length > 0) {
		res.status(403);
		throw new Error("This email is already registered");
	}

	const wallet = await Wallet.create({
		address: req.body.address,
		name: req.body.name,
		email: req.body.email,
	});

	res.status(200).json(wallet);
});

const removeWallet = asyncHandler(async (req, res) => {
	const wallet = await Wallet.find({});

	if (!wallet) {
		res.status(400);
		throw new Error("Not found");
	}

	await Wallet.remove();
	res.status(200).json({ message: "All collections have been deleted" });
});

module.exports = { setWallet, getWallet, removeWallet };
