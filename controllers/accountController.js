const { validationResult } = require("express-validator");
const { accountService } = require("../services");

// << Fund User Account >>

const fundAccount = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const accountData = {
      user: req.user,
      amount: req.body.amount,
    };

    const account = await accountService.fundAccount(accountData);

    return res.status(200).send({
      success: true,
      message: "Account Funded Successfully",
      account,
    });
  } catch (error) {
    console.error("Error Funding User Account ->>", error);
    return res.status(500).send(error);
  }
};

// << Get Account Information >>

const getAccountInfo = async (req, res) => {
  try {
    const accountData = {
      user: req.user,
    };

    const account = await accountService.getAccountInfo(accountData);

    return res.status(200).send({
      success: true,
      message: "Returned account information successfully",
      result: account,
    });
  } catch (error) {
    console.error("Get User Account Information Error ==>", error);
    return res.status(500).send(error);
  }
};

// << Set Account Pin >>

const setAccountPin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const accountData = {
      pin: req.body.pin,
      user: req.user,
    };

    await accountService.setAccountPin(accountData);

    return res.status(200).send({
      success: true,
      message: "Account pin set successfully!",
    });
  } catch (error) {
    console.error("Error SetAccountPin ->>", error);
    return res.status(500).send(error);
  }
};

// << Transfer Funds >>

const transferFund = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { amount, recipient_account_number, sender_account_pin } = req.body;

    const accountData = {
      amount,
      recipient_account_number,
      sender_account_pin,
      user: req.user,
    };

    await accountService.transferFund(accountData);

    return res.status(200).send({
      success: true,
      message: "Transferred Fund Successfully :)",
    });
  } catch (error) {
    console.error("Error transferFund ->>", error);
    return res.status(500).send(error);
  }
};

// << Withdraw Funds >>

const withdrawFund = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { amount, account_pin } = req.body;

    const accountData = {
      amount,
      account_pin,
      user: req.user,
    };

    await accountService.withdrawFund(accountData);

    return res.status(200).send({
      success: true,
      message: "Withdrawal Successful :)",
    });
  } catch (error) {
    console.error("Error withdrawing fund ->>", error);
    return res.status(500).send(error);
  }
};

module.exports = {
  fundAccount,
  setAccountPin,
  transferFund,
  withdrawFund,
  getAccountInfo,
};
