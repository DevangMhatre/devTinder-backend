const mongoose = require("mongoose");
require("dotenv").config();

// Connects to Cluster
// * mongoose.connect() returns a promise so we do to async/await
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;
