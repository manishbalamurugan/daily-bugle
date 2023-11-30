// Import required modules
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongo");
const mongodb = require("mongodb");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Generate a session secret key
const secret = crypto.randomBytes(64).toString("hex");
const uri = "mongodb+srv://manish:DailyBugle24@daily-bugle.q0hsoij.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB
const client = mongodb.client;
let db;

const store = MongoDBStore.create({
  mongoUrl: uri,
  mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
});

client.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;
    db = client.db("daily-bugle");
  }
);

// Configure Passport.js
passport.use(
  new LocalStrategy(function (username, password, done) {
    db.collection("users").findOne(
      { username: username },
      function (err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, { message: "Incorrect username." });
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return done(err);
          if (isMatch) return done(null, user);
          else return done(null, false, { message: "Incorrect password." });
        });
      }
    );
  })
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  db.collection("users").findOne(
    { _id: new mongodb.ObjectID(id) },
    function (err, user) {
      done(err, user);
    }
  );
});

// Initialize Express and middleware
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.post("/register", function (req, res) {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.status(400).send("Error hashing password");
    db.collection("users").insertOne(
      { username: req.body.username, password: hash },
      (err) => {
        if (err) return res.status(400).send("Error registering user");
        res.redirect("/login");
      }
    );
  });
});

app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("Welcome, " + req.user.username);
  } else {
    res.send("Please log in");
  }
});

// Start the server
app.listen(6060, () => {
  console.log("Server started on port 6060");
});
