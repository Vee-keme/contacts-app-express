//express async handler is a replacement for try-catch blocks to check for errors in async operations
const asyncHandler = require("express-async-handler");

//@desc Register a User
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
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
