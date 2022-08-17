const db = require("../config/database");


const setAccountPin = async (req, res, next) => {
  try {
    const user = req.user;

    const account = await db("accounts").where("user_id", user.id).first();

    if (!account.account_pin) {
      return res.status(400).send({
        success: false,
        message: "Please set your account pin before performing any transaction",
      });
    }
    next();
  } catch (error) {
    console.error(" Middleware-AccountPin Error ->>", error);
    return res.status(500).send(error);
  }
};

module.exports = {
  setAccountPin,
};
