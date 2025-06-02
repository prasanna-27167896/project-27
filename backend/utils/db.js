const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully...💻");
  } catch (error) {
    console.log("MongoDB failed to connect...❌", error.message);
  }
};

module.exports = db;
