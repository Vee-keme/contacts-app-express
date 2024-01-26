const User = require("../models/userModel");
//express async handler is a replacement for try-catch blocks to check for errors in async operations
const asyncHandler = require("express-async-handler");

//bycrpt is used to hash passwords so the database can accept them
const bcrypt = require("bcrypt");

//@desc Register a User
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  //hashed password
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("hashed password:", hashedPassword);
  res.json({ message: "register the user" });
});

//@desc Login User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "LOGIN USER" });
});

//@desc Current User Info
//@route GET /api/users/register
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "CURRENT USER INFORMATION" });
});

module.exports = { registerUser, loginUser, currentUser };
