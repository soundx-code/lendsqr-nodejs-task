const express = require("express");
const paymentController = require("../controllers/paymentController");
const { isAuthUser } = require("../middlewares/auth");

const router = express.Router();
router.get("/payments", [isAuthUser], paymentController.getPayments);

module.exports = router;
