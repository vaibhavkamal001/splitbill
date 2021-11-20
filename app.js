const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Joi = require("joi");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const passport = require("passport");
const localStategy = require("passport-local");
const session = require("express-session");
const MongoDBStore = require("connect-mongo");
const flash = require("connect-flash");
const User = require("./model/user");

const dbUrl = process.env.DBURL || "mongodb://localhost:27017/split-bill";
const secret = process.env.SECRET || "thissecretisbad";

mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middelware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

// Session
const store = MongoDBStore.create({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log("SESSION ERROR", e);
});

const sessionConfig = {
  store,
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

// flash
app.use(flash());

// flash middelware
app.use((req, res, next) => {
  res.locals.CurrentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// passport

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routers

app.get("/register", async (req, res) => {
  res.render("Groups/register");
});

app.post("/register", async (req, res) => {
  const {username,password} = req.body;
  new User
  res.redirect("/splitbill");
});

app.get("/login", async (req, res) => {
  res.render("Groups/login");
});

app.get("/splitbill", async (req, res) => {
  res.render("Groups/ShowGroup");
});

app.get("/group/new", async (req, res) => {
  res.render("Groups/addGroup");
});

app.get("/group/new", async (req, res) => {
  res.render("Groups/addGroup");
});

app.get("/", async (req, res) => {
  res.send("<h1>hello</h1>");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`serving to ${port}`);
});
