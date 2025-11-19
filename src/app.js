const express = require("express");

const app = express();

// app.use() match all the http method api call to /test
app.use("/test", (req, res) => {
  res.send("Hello from the server!");
});

// This only handles get call to /users
app.get("/user", (req, res) => {
  res.send({ firstName: "Devang", lastName: "Mhatre" });
});

app.post("/user", (req, res) => {
  res.send("Data successfully saved to the Database");
});

app.delete("/user", (req, res) => {
  res.send("Deleted Successfully");
});

app.listen(3000, () => {
  console.log("App listening on port 3000...");
});
