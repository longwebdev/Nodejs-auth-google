const express = require("express");
const passportSetup = require("./config/passport");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const app = express();

// set view engine
app.set("view engine", "ejs");

// cookie-session
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
// connect to mongodb
mongoose
  .connect(keys.MongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connect..."))
  .catch(err => console.log(err));

// create home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

// setup routes
app.use("/auth", require("./routes/authRoute"));
app.use("/profile", require("./routes/profileRoute"));

app.listen(5000, () => {
  console.log("app now listening for requests on port 5000");
});
