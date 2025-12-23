const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// ! EP-8 Data Sanitization
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true, // ! Removes extra spaces
      validate(emailId) {
        if (!validator.isEmail(emailId)) {
          throw new Error("Invalid Email Address.");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(password) {
        if (!validator.isStrongPassword(password)) {
          throw new Error("Password not strong enough.");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      // * Doesn't work for existing documents by default
      validate(value) {
        if (!["Male", "Female", "Others"].includes(value)) {
          throw new Error("Gender data is not valid.");
        }
      },
    },
    photoURL: {
      type: String,
      validate(url) {
        if (!validator.isURL(url)) {
          throw new Error("Invalid Photo URL.");
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user",
    },
    skills: {
      // ! By default, if there is an array of something, mongoDB creates an empty space for it even if it's not listed as required
      type: [String],
      validate(val) {
        if (val.length > 10) throw new Error("Skills cannot be more than 10.");
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.verifyPassword = async function (passwordInputByUser) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    user.password
  );

  return isPasswordValid;
};

// * Always start with Capital letter when defininig the model name
const User = mongoose.model("User", userSchema);

module.exports = User;
