const express = require("express");
const userController = require("../controllers/userController");
const { userValidation } = require("../validations");
const { isAuthUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", userValidation.register, userController.register);
router.post("/login", userValidation.login, userController.login);
router.get("/user/profile", [isAuthUser], userController.getUserProfile);

module.exports = router;
