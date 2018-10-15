var express = require("express");
var path = require("path");
var ud = require("urban-dictionary");
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
app.get("/js/travis.js", function (req, resp) {
    resp.sendFile(path.join(__dirname + "/client/js/travis.js"));
});
app.get("/js/main.js", function (req, resp) {
    resp.sendFile(path.join(__dirname + "/client/js/main.js"));
});
app.get("/js/artyom.window.js", function (req, resp) {
    resp.sendFile(path.join(__dirname + "/../node_modules/artyom.js/build/artyom.window.min.js"));
});
app.get("/css/style.css", function (req, resp) {
    resp.sendFile(path.join(__dirname + "/client/css/style.css"));
});
app.get("/css/main.css", function (req, resp) {
    resp.sendFile(path.join(__dirname + "/client/css/main.css"));
});
app.get("/images/background.png", function (req, resp) {
    resp.sendFile(path.join(__dirname + "/client/images/background.png"));
});
app.put("/api/urban-dictionary", function (req, resp) {
    var term = req.body.term;
    ud.term(term).then(function (result) {
        var entries = result.entries;
        // console.log(entries[0].word)
        // console.log(entries[0].definition)
        // console.log(entries[0].example)
        return resp.status(HTTP.OK).json(entries[0].definition);
    }).catch(function (error) {
        console.error(error.message);
    });
});
app.listen(app.get("port"), function () {
    console.log("Listening on port " + app.get("port"));
});
