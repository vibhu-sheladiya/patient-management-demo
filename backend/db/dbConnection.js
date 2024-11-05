const mongoose = require("mongoose");
const config = require("../config/config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodb.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 20000,   // Set connection timeout to 20 seconds
      socketTimeoutMS: 45000,    // Set socket timeout to 45 seconds
    });
    console.log("Database connection successful!");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the process with a failure
  }
};

module.exports = { connectDB };
