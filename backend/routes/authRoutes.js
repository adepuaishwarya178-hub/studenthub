const express = require("express");
const router = express.Router();

const User = require("../models/User");

// SIGNUP

router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const user = new User({
      name,
      email,
      password,
      role,
    });

    await user.save();

    res.status(201).json({
      message: "Account created successfully",
      user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Signup failed",
    });
  }
});


// LOGIN

router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password,
      role,
    } = req.body;

    const user = await User.findOne({
      email,
      role,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or role",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Login failed",
    });
  }
});


module.exports = router;