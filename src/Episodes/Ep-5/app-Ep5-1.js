const express = require("express");

const app = express();

app.get(
  "/user",
  (req, res, next) => {
    console.log("Route 1");
    next();
    res.send("1st Response!");
  },
  (req, res) => {
    console.log("Route 2");
    res.send("2st Response!");
  }
);

app.listen(3000, () => {
  console.log("App listening on port 3000...");
});
