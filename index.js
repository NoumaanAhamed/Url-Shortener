const express = require("express");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");

const path = require("path");

const { connectToMongoDB } = require("./connect");

const URL = require("./models/url");

const app = express();
const port = 5000;

connectToMongoDB("mongodb://localhost:27017/").then(() => {
  console.log("Database Connected");
});

app.set("view engine", "ejs");
// app.set("views", path.resolve("./views"));//!Set by default

app.use(express.json()); //!parse body
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute); //!use Router
app.use("/", staticRoute); //!use Router

app.listen(port, () => {
  console.log("Listening..");
});
