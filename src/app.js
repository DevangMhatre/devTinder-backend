const express = require("express");

const app = express();

app.get("/user/:id", (req, res) => {
  console.log(req.params);
  res.send("Hello from the server!");
});

app.listen(3000, () => {
  console.log("App listening on port 3000...");
});
