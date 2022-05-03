const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

const Wallet = require("../model/walletModel");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "testsquirrelnft@gmail.com",
		// user: 'testsquirrelnft@outlook.com',
		pass: "MoonKnight1$",
	},
	// tls: {
	// 	rejectUnauthorized: false
	// }
});

const sendMail = asyncHandler(async (req, res) => {
	const allMail = await Wallet.find();

	allMail.map((mail) => {
		const mailOptions = {
			from: '"Squirrel" <support@squirrel.solution>', // sender address
			to: mail.email,
			subject: "Congratualtions on Having your 1st NFT", // Subject line
			text: "Hello from Squirrel, You have received your first NFT in Polygon network. Check your wallet to see the NFT. Also visit the link below for confirmation", // plain text body
			html: `<h2>Hello from Squirrel</h2>
			<h3>You have received your first NFT in the Polygon network. Check your wallet to see the NFT.</h3>
			<h3>Visit the <a href=${req.body.message}>here</a> for confirmation</h3>
			<div style="background:black;width:120px;padding:5px">
			<img height=30px src="https://www.squirrel.solutions/wp-content/uploads/2022/02/Asset-1-2-2048x511.png">
			</div>`,
		};

		try {
			console.log("trying to send mail");
			transporter.sendMail(mailOptions, function (err, info) {
				if (err) {
					console.log("mail error");
					console.log(err.message);
					//   throw new Error(err.message)
				} else {
					console.log("mail sent success");
					console.log(info);
					res.send(info);
				}
			});
		} catch (error) {
			console.log("coming from 2");
			throw new Error(error.message);
		}
	});
});

module.exports = { sendMail };
