const mongoose = require("mongoose");

// ! EP-8 Data Sanitization
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 50,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true, // ! Removes extra spaces
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      // * Doesn't work for existing documents by default
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid.");
        }
      },
    },
    photoURL: {
      type: String,
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

// * Always start with Capital letter when defininig the model name
const User = mongoose.model("User", userSchema);

module.exports = User;
