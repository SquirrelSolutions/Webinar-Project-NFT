const express = require("express");
const router = express.Router();

const {getWallet, setWallet, removeWallet} = require("../controller/walletController")

router.route("/").get(getWallet).post(setWallet);
router.route("/").delete(removeWallet);

module.exports = router;
