const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");

const connectDB = require("./config/database");
const User = require("./models/user");
const validateSignUpData = require("./utils/validation");

const app = express();
const PORT = process.env.PORT;

// ! Converts the incoming JSON to JS Object
app.use(express.json());

// * Dynamic Data - Signup API
app.post("/signup", async (req, res) => {
  // console.log(req.body);

  try {
    // Data Validation
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the Password
    const passwordHash = await bcrypt.hash(password, 10);

    // const user = new User(req.body);   // ! Bad Practice
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User Added Successfully!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// * Login API
app.post("/login", async (req, res) => {
  try {
    // Validation
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      // throw new Error("EmailId is not registered in the Database");
      throw new Error("Invalid Credentials!");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login Succesfull!");
    } else {
      throw new Error("Invalid Credentials!");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
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
app.patch("/user/:userId", async (req, res) => {
  // ! We don't have userId in our Schema, so MongoDB just ignores it
  // const userId = req.body.userId;

  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoURL",
      "skills",
      "age",
      "gender",
      "about",
    ];
    const isUpdatedAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdatedAllowed) {
      throw new Error("Update not allowed.");
    }

    if (data?.skills > 10) {
      throw new Error("Skills cannot be more than 10.");
    }

    // ! Options parameters are cool :D
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "before",
      runValidators: true,
    });
    // console.log(user);
    res.send("User Updated Successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
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
