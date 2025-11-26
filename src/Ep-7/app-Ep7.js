const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");

const User = require("./models/user");

const app = express();
const PORT = process.env.PORT;

// ! Converts the incoming JSON to JS Object
app.use(express.json());

// * Dynamic Data - Signup API
app.post("/signup", async (req, res) => {
  // console.log(req.body);

  const user = new User(req.body);

  try {
    await user.save();
    res.send("Successful");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

// * Get user by email
app.get("/user", async (req, res) => {
  try {
    const user = await User.find({ emailId: req.body.emailId });
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// * Feed API - GET /feed -> Getting User from Database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("Users not found.");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong:" + err.message);
  }
});

// * Delete the User
app.delete("/user", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.userId);
    res.send("User Deleted Succesffully!");
  } catch (err) {
    res.status(400).send("Something went wrong:" + err.message);
  }
});

// * Update the User
app.patch("/user", async (req, res) => {
  // ! We don't have userId in our Schema, so MongoDB just ignores it
  const userId = req.body.userId;
  const data = req.body;
  try {
    // ! Options parameters are cool :D
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "before",
    });
    // console.log(user);
    res.send("User Updated Successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database Connected!");
    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Connection failed.");
  });
