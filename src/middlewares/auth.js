require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const SECRET_KEY = process.env.SECRET_KEY;

const userAuth = async (req, res, next) => {
  try {
    // Reading the TOken
    const { token } = req.cookies;
    if (!token) {
      // throw new Error("Invalid Token.");
      return res.status(401).send("You are not Logged In, Please Login");
    }
    const decodedObj = await jwt.verify(token, SECRET_KEY);
    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found!");
    }

    // ! Since, we already have user found here, so we will just pass it the request
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = userAuth;
