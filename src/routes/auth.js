const express = require("express");
const bcrypt = require("bcrypt");

const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
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
    const savedUser = await user.save();

    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 86400000),
    });

    res.json({ message: "User Added Successfully!", data: savedUser });
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
      res.json({ data: user });
    } else {
      throw new Error("Invalid Credentials!");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// * Logout API
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!");
});

module.exports = authRouter;
