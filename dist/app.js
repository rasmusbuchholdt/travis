var express = require("express");
var path = require("path");
var bodyparser = require("body-parser");
var HTTP = require("http-status-codes");
var config = require("../config/app.json");
var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(function (req, resp, next) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    resp.header("Access-Control-Allow-Methods", "GET, PUT");
    //resp.header("Content-Type", "application/json");
    next();
});
app.set("port", (process.env.PORT || config.port));
app.get("/", function (req, resp) {
    resp.sendFile(path.join(__dirname + "/client/index.html"));
});
app.get("/main.js", function (req, resp) {
    resp.sendFile(path.join(__dirname + "/client/main.js"));
});
app.get("/main.css", function (req, resp) {
    resp.sendFile(path.join(__dirname + "/client/main.css"));
});
app.get("/api/", function (req, resp) {
    return resp.status(HTTP.OK).json("It works!");
});
app.listen(app.get("port"), function () {
    console.log("Listening on port " + app.get("port"));
});
