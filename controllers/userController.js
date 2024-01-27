const User = require("../models/userModel");
//express async handler is a replacement for try-catch blocks to check for errors in async operations
const asyncHandler = require("express-async-handler");

//bycrpt is used to hash passwords so the database can accept them
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

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
  //new user instance
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`user created successfully ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("user data is not valid");
  }

  res.json({ message: "register the user" });
});

//@desc Login User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashed password
  if (email && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        //pass payload into jwt signin method
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password is not valid!");
  }
  // res.json({ message: "LOGIN USER" });
});

//@desc Current User Info
//@route GET /api/users/register
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
