require("dotenv").config({ path: "ENV_FILENAME" });
const mongoose = require("mongoose");

// Connects to Cluster
// * mongoose.connect() returns a promise so we do to async/await
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI.toString());
};

module.exports = connectDB;
