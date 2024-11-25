const http = require("http");
const https = require("https");
const fs = require("fs");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const express = require("express");
const app = express();

const { performLogin, checkLogin } = require("./src/user/login.js");
const { performRegister } = require("./src/user/register.js");

const { db } = require("./src/database/database.js")

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/blank_profile.png", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'blank_profile.png'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.post("/login", (req, res) => {
  performLogin(req, res);
});

app.post("/register", (req, res) => {
  performRegister(req, res);
});

app.post("/check-login", (req, res) => {
  checkLogin(req, res);
});

app.post("/logout", (req, res) => {
  res.clearCookie("user");
  res.status(200).json({ message: "Logged out successfully!" });
});

app.listen(80, () => {
  console.log("Server running on http://localhost:80");
});
