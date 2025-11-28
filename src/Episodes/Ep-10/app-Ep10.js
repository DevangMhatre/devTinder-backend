const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const connectDB = require("./config/database");
const User = require("../../models/user");
const validateSignUpData = require("./utils/validation");
const userAuth = require("./middlewares/auth");

const app = express();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

// ! Converts the incoming JSON to JS Object
app.use(express.json());
// ! Parse the cookie
app.use(cookieParser());

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

// ! COOKIES!
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

// * Profile API
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    res.send(`${user.firstName} Sent the Connection Request!`);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
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
