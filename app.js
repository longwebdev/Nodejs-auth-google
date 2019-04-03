const express = require("express");
const passportSetup = require("./config/passport");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const app = express();

// set view engine
app.set("view engine", "ejs");

// connect to mongodb
mongoose
  .connect(keys.MongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connect..."))
  .catch(err => console.log(err));

// create home route
app.get("/", (req, res) => {
  res.render("home");
});

// setup routes
app.use("/auth", require("./routes/authRoute"));

app.listen(5000, () => {
  console.log("app now listening for requests on port 5000");
});
