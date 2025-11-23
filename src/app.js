const express = require("express");
const connectDB = require("./config/database");

const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Virat",
    lastName: "Kohli",
    emailId: "virat@gmail.com",
    password: "virat@123",
  };

  // ! Creates a instance of the user model
  const user = new User(userObj);

  // ! Always use try-catch block while doing DB Operations
  try {
    // ! This will save our instance in our database
    await user.save();
    res.send("Successful");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

// ! Always first make sure that Database is connected first then only start Listening to the Server
connectDB()
  .then(() => {
    console.log("Database Connected!");
    app.listen(3000, () => {
      console.log("App listening on port 3000...");
    });
  })
  .catch((err) => {
    console.error("Database Connection failed.");
  });
