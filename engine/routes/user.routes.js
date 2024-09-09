const express = require("express");
const {
  registerUser,
  loginUser,
  googleLoginUser,
} = require("../controllers/user.controllers");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google-login", googleLoginUser);

module.exports = router;
