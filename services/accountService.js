const db = require("../config/database");
const randomstring = require("randomstring");
const bcrypt = require("bcryptjs");
require("dotenv/config");

/**
 * Create Account
 * @param {Integer} userID
 * @returns {Promise<Account>}
 */

const createAccount = async (userID) => {
  const user = await db.select("*").from("users").where("id", userID).first();

  const generatedAccountNumber = randomstring.generate({
    length: 9,
    charset: "alphanumeric",
    capitalization: "uppercase",
  });

  const account = await db("accounts").insert({
    user_id: user.id,
    account_number: generatedAccountNumber,
  });
  return account;
};

/**
 * Get Account Information
 * @param {Object} accountData
 * @returns {Promise<Account>}
 */

const getAccountInfo = async (accountData) => {
  const user = accountData.user;
  const account = await db("accounts").where("user_id", user.id).first();

  return account;
};

/**
 * Set Account Pin
 * @param {Object} accountData
 * @returns {Promise<Account>}
 */

const setAccountPin = async (accountData) => {
  const user = accountData.user;
  const pin = accountData.pin.toString();

  const hashPin = await bcrypt.hashSync(pin, 10);

  const account = await db("accounts").where("user_id", user.id).first();
  if (!account.account_pin) {
    await db("accounts")
      .where("user_id", user.id)
      .update({ account_pin: hashPin });
  }
  return account;
};

/**
 * Fund User Account
 * @param {Object} accountData
 * @returns {Promise<Account>}
 */

const fundAccount = async (accountData) => {
  const user = accountData.user;
  const amount = accountData.amount;

  const generatedReference = randomstring.generate({
    length: 10,
    charset: "alphanumeric",
    capitalization: "uppercase",
  });

  await db("payments").insert({
    sender_id: user.id,
    receiver_id: user.id,
    reference: `LSR-N-${generatedReference}`,
    amount: amount,
    status: "successful",
  });

  const account = await db("accounts")
    .where("user_id", user.id)
    .increment("account_balance", amount);

  await db("transactions").insert({
    user_id: user.id,
    reference: `LSR-N-${generatedReference}`,
    amount: amount,
    type: "funding",
    status: "successful",
  });

  return account;
};

/**
 * Transfer Funds to another user
 * @param {Object} accountData
 * @returns {Promise<Account>}
 */

const transferFund = async (accountData) => {
  const sender = accountData.user;
  const recipientAccountNumber = accountData.recipient_account_number;
  const amount = accountData.amount;
  const senderAccountPin = accountData.sender_account_pin;

  const recipientAccount = await db("accounts")
    .where("account_number", recipientAccountNumber)
    .first();

  const recipientID = recipientAccount?.user_id || null;

  let recipient = await db("users").where("id", recipientID).first();

  if (!recipient) {
    return Promise.reject({
      message: "Recipient not found",
      success: false,
    });
  }

  if (sender.id === recipient.id) {
    return Promise.reject({
      message: "You cannot transfer fund to yourself",
      success: false,
    });
  }

  const senderAccount = await db("accounts")
    .where("user_id", sender.id)
    .first();

  // << Checking if account pin is correct >>
  const match = await bcrypt.compare(
    senderAccountPin,
    senderAccount.account_pin
  );

  if (!match) {
    return Promise.reject({
      message: "Incorrect Pin :(",
      success: false,
    });
  }

  // << Checking if user has enough funds >>
  if (senderAccount.account_balance < amount) {
    return Promise.reject({ message: "Insufficient Fund", success: false });
  }

  const generatedReference = randomstring.generate({
    length: 10,
    charset: "alphanumeric",
    capitalization: "uppercase",
  });

  // << Deduct from sender account balance >>
  await db("accounts")
    .where("user_id", sender.id)
    .decrement("account_balance", amount);

  await db("transactions").insert({
    user_id: sender.id,
    reference: `LSR-N-${generatedReference}`,
    amount: amount,
    type: "transfer",
    status: "successful",
  });

  // << Add to recipient account balance >>
  await db("accounts")
    .where("user_id", recipient.id)
    .increment("account_balance", amount);

  await db("transactions").insert({
    user_id: recipient.id,
    reference: `LSR-N-${generatedReference}`,
    amount: amount,
    type: "receiving",
    status: "successful",
  });
};

/**
 * Withdraw Fund from user account
 * @param {Object} accountData
 * @returns {Promise<Account>}
 */

const withdrawFund = async (accountData) => {
  const user = accountData.user;
  const amountToDeduct = accountData.amount;
  const accountPin = accountData.account_pin;

  const userAccount = await db("accounts").where("user_id", user.id).first();

  const generatedReference = randomstring.generate({
    length: 10,
    charset: "alphanumeric",
    capitalization: "uppercase",
  });
  
  // << Checking if account pin is correct >>
  const match = await bcrypt.compare(accountPin, userAccount.account_pin);

  if (!match) {
    return Promise.reject({
      message: "Incorrect Pin",
      success: false,
    });
  }

  // << Checking if user has enough funds >>

  if (userAccount.account_balance < amountToDeduct) {
    return Promise.reject({ message: "Insufficient Funds", success: false });
  }

  // << Deducting from user's account balance >>
  await db("accounts")
    .where("user_id", user.id)
    .decrement("account_balance", amountToDeduct);

  await db("transactions").insert({
    user_id: user.id,
    reference: `LSR-N-${generatedReference}`,
    amount: amountToDeduct,
    type: "withdrawal",
    status: "successful",
  });
};

module.exports = {
  createAccount,
  getAccountInfo,
  setAccountPin,
  fundAccount,
  transferFund,
  withdrawFund,
};
