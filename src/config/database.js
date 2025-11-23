const mongoose = require("mongoose");

// Connects to Cluster
// * mongoose.connect() returns a promise so we do to async/await
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://devangmhatre396:nbtKi3xuaUX7W6A4@practice.rr4tnp6.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
