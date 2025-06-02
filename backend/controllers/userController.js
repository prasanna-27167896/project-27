const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

// registration

const register = async (req, res) => {
  try {
    console.log("Received register request:", req.body);
    const { username, email, password, setpassword } = req.body;

    const userWithEmail = await User.findOne({ email });
    if (userWithEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const userWithUsername = await User.findOne({ username });
    if (userWithUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (password !== setpassword) {
      return res.status(401).json({ messge: "Passwords not matched" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User Created Successfully", user });
  } catch (error) {
    // console.log("Request body:", req.body);
    console.log(error.message);
    res.status(400).json({ succes: false, message: "Failed to register" });
  }
};

//login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "No user exist with this email" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(401).send("Authentication failed");
    }

    //Generating a token

    let token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      success: true,
      message: "User login successfull",
      token,
      name: user.username,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ succes: false, message: "Failed to login", error });
  }
};

module.exports = { register, login };
