const { check } = require("express-validator");

const setAccountPin = [
  check("pin", "Pin is required")
    .not()
    .isEmpty()
    .isLength({ min: 4, max: 4 })
    .withMessage("Your Account Pin must contain only 4 numbers. Please try again :)")
    .isInt()
    .withMessage("Your Account Pin must contain only numbers. Please try again :)"),
  check("confirm_pin", "Confirm pin is required")
    .not()
    .isEmpty()
    .isLength({ min: 4, max: 4 })
    .withMessage("Confirm pin must contain only 4 numbers. Please try again :)")
    .isInt()
    .withMessage("Confirm pin must contain only numbers. Please try again :)")
    .custom((value, { req }) => {
      if (value !== req.body.pin) {
        return Promise.reject("Confirm pin must be the same as pin. Please try again :)");
      } else {
        return true;
      }
    }),
];

const fundAccount = [
  check("amount", "Amount is required")
    .not()
    .isEmpty()
    .isInt()
    .withMessage("amount must contain only numbers"),
];

const transferFund = [
  check("amount", "Amount is required")
    .not()
    .isEmpty()
    .isInt()
    .withMessage("amount must be a number"),
    check("recipient_account_number", "Please provide recipient account number")
    .not()
    .isEmpty(),
    check("sender_account_pin", "Account pin is required")
    .not()
    .isEmpty()
];

const withdrawFund = [
  check("amount", "Amount is required")
    .not()
    .isEmpty()
    .isInt()
    .withMessage("amount must be a number"),
    check("account_pin", "Account pin is required")
    .not()
    .isEmpty()
];


module.exports = {
  setAccountPin,
  fundAccount,
  transferFund,
  withdrawFund,
};
