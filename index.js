const express = require("express");
const path = require("path");
const fs = require("fs");

const request = require("request");
const pAPIkey = process.env.GOOGLE_API;
const cx = process.env.GOOGLE_CX;

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

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/api/imagesearch", imgSearch);

app.get("/api/imagesearch/:image", imgSearch);

function imgSearch(req, res) {
  var query = req.params.image || req.query.query; // Capture the query coming either as a URL param or URL query
  var pages = req.query.offset || "no-offset-provided";
  var pagestr = !isNaN(+pages) ? "&start=" + (+pages * 10) : ""; // Using unary '+' operator to convert to a number, reads easier than ParseInt()
  var googlURLPrefix = "https://www.googleapis.com/customsearch/v1?key=";
  
  request(googlURLPrefix + pAPIkey + "&cx=" + cx + "&searchType=image" + "&q=" + query + pagestr, function (err, response, body) {
    if (err) console.log('Error:', err);
    var date = new Date();
    mongoDB.collection("images").insertOne({query: query, time: date.toString()}, function (err, r) {
      if (err) console.log("Error:", err);
      console.log("Documents inserted:", r.insertedCount)
    });
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    res.json(JSON.parse(body));
  });
}

app.get("/api/latest/imagesearch", function (req, res) {
  // Display the xth most recent image searches performed from the db
  mongoDB.collection("images").find({}).limit(10).toArray(function (err, items) {
    console.log(items);
    res.json(items);
  });
});


app.listen(port);