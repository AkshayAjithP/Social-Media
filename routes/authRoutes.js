const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");

router.post("/register", register);
router.post("/logout", logout);
router.get("/login", login);

module.exports = router;
