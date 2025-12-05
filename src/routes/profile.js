const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");

const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");
const {
  validateProfileEditData,
  validatePassword,
} = require("../utils/validation");

// * Profile API
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.json({ data: user });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// * Profile Edit API
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Request!");
    }

    const user = req.user;

    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    await user.save();

    res.json({
      message: `${user.firstName} your profile was updated successfully!`,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// * Password Edit API
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    if (!validatePassword(req)) {
      throw new Error("Password should not have any spaces.");
    }

    const { password } = req.body;
    const user = req.user;

    if (!user) {
      throw new Error("User not found. Please log in.");
    }

    const isStrongPassword = validator.isStrongPassword(password);
    if (!isStrongPassword) {
      throw new Error("Password is not strong enough.");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    user.password = passwordHash;
    await user.save();

    res.send("Password Updated Successfully!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
