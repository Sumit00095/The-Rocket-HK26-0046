const mongoose = require("mongoose");
const dns = require("dns");

// Keep this only if your MongoDB Atlas connection
// needs these DNS servers in your environment.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Error:", error.message);
    throw error;
  }
};

module.exports = connectDB;