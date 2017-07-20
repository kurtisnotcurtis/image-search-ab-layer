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


app.listen(port);