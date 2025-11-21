const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send("User Data Sent");
});

app.listen(3000, () => {
  console.log("App listening on port 3000...");
});
