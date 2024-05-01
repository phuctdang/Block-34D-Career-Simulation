const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require("express");
const app = express();
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res, next) => {
  res.send("Connected to Server!");
})

app.use(async(req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  
  try {
    req.user = jwt.verify(token, process.env.JWT);
    console.log(req.user)
  } catch {req.user = null};
  next();
})

app.use("/api/posts", require("./api/post.js"));
app.use("/api/auth", require("./api/auth.js"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal servor error.");
})

app.use((req, res) => {
  res.status(404).send("http address not found.");
})

module.exports = app;