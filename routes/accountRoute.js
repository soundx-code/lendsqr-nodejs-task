const express = require("express");
const accountController = require("../controllers/accountController");
const { accountValidation } = require('../validations');
const { isAuthUser } = require("../middlewares/auth");
const { setAccountPin } = require("../middlewares/account-pin");

const router = express.Router();

router.get("/account/info", [isAuthUser, setAccountPin], accountController.getAccountInfo);
router.post("/account/fund", [isAuthUser, setAccountPin, accountValidation.fundAccount], accountController.fundAccount);
router.post("/account/transfer", [isAuthUser, setAccountPin, accountValidation.transferFund], accountController.transferFund);
router.post("/account/set-pin", [isAuthUser, accountValidation.setAccountPin], accountController.setAccountPin);
router.post("/account/withdraw", [isAuthUser, setAccountPin, accountValidation.withdrawFund], accountController.withdrawFund);

module.exports = router;
