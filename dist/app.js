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
    next();
});
app.set("port", (process.env.PORT || config.port));
app.get("/", function (req, resp) {
    resp.sendFile(path.join(__dirname + "/client/index.html"));
});
app.get("/js/main.js", function (req, resp) {
    resp.sendFile(path.join(__dirname + "/client/js/main.js"));
});
app.get("/js/travis.js", function (req, resp) {
    resp.sendFile(path.join(__dirname + "/client/js/travis.js"));
});
app.get("/js/artyom.window.js", function (req, resp) {
    resp.sendFile(path.join(__dirname + "/../node_modules/artyom.js/build/artyom.window.min.js"));
});
app.get("/css/style.css", function (req, resp) {
    resp.sendFile(path.join(__dirname + "/client/css/style.css"));
});
app.get("/api/", function (req, resp) {
    return resp.status(HTTP.OK).json("It works!");
});
app.listen(app.get("port"), function () {
    console.log("Listening on port " + app.get("port"));
});
