"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = require("./modules/passport");
var spotify_1 = require("./modules/spotify");
var plex_1 = require("./modules/plex");
var express = require("express");
var path = require("path");
var ud = require("urban-dictionary");
var bodyparser = require("body-parser");
var compression = require("compression");
var HTTP = require("http-status-codes");
var config = require("../config/app.json");
var passport = new passport_1.Passport().getPassport();
var app = express();
app.use(compression());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/client"));
app.use(passport.initialize());
app.use(function (req, resp, next) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    resp.header("Access-Control-Allow-Methods", "GET, PUT");
    next();
});
app.set("port", (process.env.PORT || config.port));
app.get("/js/artyom.window.js", function (req, resp) {
    resp.sendFile(path.join(__dirname + "/../node_modules/artyom.js/build/artyom.window.min.js"));
});
app.put("/api/urban-dictionary", function (req, resp) {
    var term = req.body.term;
    ud.term(term).then(function (result) {
        return resp.status(HTTP.OK).json(result.entries[0].definition);
    });
});
app.put("/api/spotify/control", function (req, resp) {
    var accessToken = req.body.accessToken;
    var action = req.body.action;
    var spotify = new spotify_1.Spotify(accessToken);
    spotify.controlPlayback(action);
    return resp.status(HTTP.OK).send();
});
app.put("/api/spotify/validate", function (req, resp) {
    new spotify_1.Spotify(req.body.accessToken).validateToken().then(function (result) {
        return resp.status(HTTP.OK).json(result);
    });
});
app.put("/api/plex/validate", function (req, resp) {
    new plex_1.Plex(req.body.ip, req.body.port, req.body.accessToken).validateToken().then(function (result) {
        return resp.status(HTTP.OK).json(result);
    });
});
app.get("/api/plex/auth", function (req, resp) {
    plex_1.Plex.getPin().then(function (result) {
        return resp.status(HTTP.OK).json(result);
    });
});
app.put("/api/plex/auth", function (req, resp) {
    plex_1.Plex.checkPin(req.body.requestId).then(function (result) {
        return resp.status(HTTP.OK).json(result);
    });
});
app.get("/auth/spotify", passport.authenticate("spotify", { scope: ["user-modify-playback-state", "user-read-playback-state"] }), function (req, resp) { });
app.get("/auth/spotify/callback", passport.authenticate("spotify", { failureRedirect: "/auth/spotify" }), function (req, resp) {
    resp.cookie("spotify_accessToken", req.user.accessToken);
    resp.redirect("/");
});
app.get("/logout", function (req, resp) {
    req.logout();
    resp.clearCookie("spotify_accessToken");
    resp.clearCookie("plex_ip");
    resp.clearCookie("plex_port");
    resp.clearCookie("plex_accessToken");
    resp.redirect("/");
});
app.listen(app.get("port"), function () {
    console.log("Listening on port " + app.get("port"));
});
