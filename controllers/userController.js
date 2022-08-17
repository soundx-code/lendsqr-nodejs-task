const { userService, accountService } = require("../services");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_config = require("../config/jwt");
const { validationResult } = require('express-validator');

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await userService.createUser(req.body);
    await accountService.createAccount(user[0]);
    return res.status(200).send({
      success: true,
      message: "Registration successful!",
    });
  } catch (error) {
    console.error("Registration Error ->>", error);
    return res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { phone_number, password } = req.body;
    const user = await userService.findUserByPhone(phone_number);
    if (!user) {
      return res
        .status(401)
        .send({ message: "Invalid phone_number or password", success: false });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res
        .status(401)
        .send({ message: "Invalid phone_number or password", success: false });
    }

    const payload = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
    };

    const token = jwt.sign(payload, jwt_config.key);

    return res.status(200).send({
      success: true,
      message: "Logged in successfully!",
      results: payload,
      token,
    });
  } catch (error) {
    console.error("Login-Error :", error);
    return res.status(500).send(error);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.user);

    return res.status(200).send({
      success: true,
      message: "Returned profile successfully :)",
      result: user,
    });
  } catch (error) {
    console.error("Get Profile Error ->>", error);
    return res.status(500).send(error);
  }
};

module.exports = {
  register,
  login,
  getUserProfile,
};
