const express = require("express");

const app = express();

// ! Exploring HTTP Methods
// // app.use() match all the http method api call to /test
// app.use("/test", (req, res) => {
//   res.send("Hello from the server!");
// });

// // This only handles get call to /users
// app.get("/user", (req, res) => {
//   res.send({ firstName: "Devang", lastName: "Mhatre" });
// });

// app.post("/user", (req, res) => {
//   res.send("Data successfully saved to the Database");
// });

// app.delete("/user", (req, res) => {
//   res.send("Deleted Successfully");
// });

const a = "v";

// ? Below code of Advanced Routing Techniques are supported on Express v4 and not on v5

// ! By putting `?` BEFORE anything makes that particular thing OPTIONAL means not required
// * Executed -> /abc, /ac
// app.get("/ab?c", (req, res) => {
//   res.send({ firstName: "Devang", lastName: "Mhatre" });
// });

// ! By putting `b+` AFTER anything makes that particular thing to be inputed in URL as many times but still will be executed
// * Executed -> /abc, /abbbbbbbbbc, /abbc --- alot of b's but still it will be executed
// app.get("/ab+c", (req, res) => {
//   res.send({ firstName: "Devang", lastName: "Mhatre" });
// });

// ! By putting `*` BETWEEN anything makes so that if we put any letters or words or anything it will still be executed
// * Executed -> /abcd, /abDEVANGcd, /abadsasdawdwacd --- anything in between ab and cd & it will still be executed
// app.get("/ab*cd", (req, res) => {
//   res.send({ firstName: "Devang", lastName: "Mhatre" });
// });

const b = "v";

// ! Use Postman for below APIs
// app.get("/user", (req, res) => {
//   console.log(req.query);
//   res.send("Hello from the server!");
// });

app.get("/user/:id", (req, res) => {
  console.log(req.params);
  res.send("Hello from the server!");
});

app.listen(3000, () => {
  console.log("App listening on port 3000...");
});
