const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.json({ message: "register the user" });
});

router.post("/login", (req, res) => {
  res.json({ message: "LOGIN USER" });
});

router.post("/current", (req, res) => {
  res.json({ message: "CURRENT USER INFORMATION" });
});
module.exports = router;
