const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config");


const signup = async (req, res) => {
  console.log("signup")
  try {
  console.log("signup")

    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save user to database
    await newUser.save();

    // Generate JWT token
    if (!config.jwtSecret) {
      throw new Error("JWT_SECRET is missing or undefined");
    }
    console.log("JWT_SECRET from .env for signup:", process.env.JWT_SECRET);

    const token = jwt.sign({ userId: newUser._id }, config.jwtSecret, {
      expiresIn: "1h"
    });

    res.status(201).json({ message: "User registered successfully", token });

  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};




// Login
const login = async (req, res) => {
  try {
    const { emailuserId, password } = req.body;
    console.log("emailuserId:", emailuserId, "password:", password);

    // Find user by username or email (returns an array)
    const users = await User.find({
      $or: [
        { username: { $regex: emailuserId, $options: "i" } },
        { email: { $regex: emailuserId, $options: "i" } },
      ],
    });

    console.log("Users found:", users);

    // If no user is found, return invalid credentials
    if (!users.length) {
      return res.status(403).json({ message: "Invalid Credentials" });
    }

    // Assuming the first match is the correct user
    const user = users[0];

    // Compare password
    const matchedPassword = await bcrypt.compare(password, user.password);
    console.log("Password Matched:", matchedPassword);

    if (!matchedPassword) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { signup, login };
