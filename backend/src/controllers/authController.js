const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    console.log("Received register request", req.body);
    const { email, username, password } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);

    console.log("Password hashed");
    const newUser = new User({ email, username, password: hashedpassword });
    await newUser.save();
    console.log("User saved to DB");

    res
      .status(201)
      .json({ message: `user ${username} registered successfully` });
  } catch (err) {
    console.error("Error in register:", err);
    res.status(401).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  register,
  login,
};
