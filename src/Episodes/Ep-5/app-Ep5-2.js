const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

// ! Middlewares makes things easier for us to understand and even make less code

app.use("/admin", adminAuth);

// * Calling userAuth is same as putting Two Route Handlers in One Route,
// * If userAuth is authenicated then it goes to another Route Handler by using next()
app.get("/user", userAuth, (req, res) => {
  res.send("User Data Sent");
});

// * No need for userAuth
app.get("/user/login", (req, res) => {
  res.send("User");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});

app.listen(3000, () => {
  console.log("App listening on port 3000...");
});
