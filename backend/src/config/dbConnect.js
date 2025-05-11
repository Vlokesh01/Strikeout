const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

module.exports = dbConnect;
