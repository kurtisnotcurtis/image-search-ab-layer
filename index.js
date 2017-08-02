const express = require("express");
const path = require("path");
const fs = require("fs");

const mongo = require("mongodb");
const mongoClient = mongo.MongoClient();
const mongoURL = process.env.MONGO_URL;
var mongoDB;

const port = process.env.PORT || 3000;

var app = express();

mongoClient.connect(mongoURL, function (err, db) {
  console.log("Connected to mongoDB @ mLab");
  mongoDB = db;
});

app.get("/api/imagesearch/:image", function (req, res) {
  // Take image param, save it to the db, and use google images API to return search results
  res.end("goodbye");
});

app.get("/api/latest/imagesearch", function (req, res) {
  // Display the xth most recent image searches performed from the db
  //res.JSON("goodbye");
});


app.listen(port);