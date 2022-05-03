const express = require("express");
const router = express.Router();

const { sendMail } = require("../controller/mailController");

router.route("/").post(sendMail);

module.exports = router;
