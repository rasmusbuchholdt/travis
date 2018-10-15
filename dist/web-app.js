"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var config = require("../config/web-app.json");
var path = require("path");
var app = express();
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
app.listen(app.get("port"), function () {
    console.log("Listening on port " + app.get("port"));
});
