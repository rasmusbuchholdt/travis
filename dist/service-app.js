"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyparser = require("body-parser");
var HTTP = require("http-status-codes");
var config = require("../config/service-app.json");
var app = express();
app.set("port", (process.env.PORT || config.port));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(function (req, resp, next) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    resp.header("Access-Control-Allow-Methods", "GET");
    resp.header("Content-Type", "application/json");
    next();
});
app.get("/api/", function (req, resp) {
    return resp.status(HTTP.OK).json("It works!");
});
app.listen(app.get("port"), function () {
    console.log("Listening on port " + app.get("port"));
});
