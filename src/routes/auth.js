const express = require("express");
const bcrypt = require("bcrypt");

const authRouter = express.Router();
const validateSignUpData = require("../utils/validation");
const User = require("../models/user");

// * Dynamic Data - Signup API
authRouter.post("/signup", async (req, res) => {
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

// ! COOKIES!
// * Login API
authRouter.post("/login", async (req, res) => {
  try {
    // Validation
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      // throw new Error("EmailId is not registered in the Database");
      throw new Error("Invalid Credentials!");
    }
    const isPasswordValid = await user.verifyPassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 86400000),
      });
      res.send("Login Succesfull!");
    } else {
      throw new Error("Invalid Credentials!");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = authRouter;
