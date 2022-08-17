const express = require("express");
const transactionController = require("../controllers/transactionController");
const { isAuthUser } = require("../middlewares/auth");

const router = express.Router();
router.get("/transactions", [isAuthUser], transactionController.getTransactions);

module.exports = router;
