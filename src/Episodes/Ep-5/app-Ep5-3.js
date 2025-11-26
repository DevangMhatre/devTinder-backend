const express = require("express");

const app = express();

app.get("/getUserData", (req, res) => {
  try {
    throw new Error("Dasdasd");
    res.send("User Data Sent");
  } catch (err) {
    res.status(500).send("Some Error");
  }
});

// ! This won't work if we put it at top since there will be error while checking from first
// * This will work if there are some error thrown from above code
app.use("/", (err, req, res, next) => {
  if (err) {
    // Log your err
    res.status(500).send("Something went wrong!");
  }
});

app.listen(3000, () => {
  console.log("App listening on port 3000...");
});
