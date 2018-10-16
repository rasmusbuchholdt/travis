"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spotifyStrategy = require("passport-spotify").Strategy;
var config = require("../../config/app.json");
var Spotify = /** @class */ (function () {
    function Spotify(token) {
        this.token = token;
    }
    Spotify.authStrategy = function () {
        return new spotifyStrategy({
            clientID: process.env.spotityClientID || config.spotityClientID,
            clientSecret: process.env.spotifyClientSecret || config.spotifyClientSecret,
            callbackURL: process.env.callbackURL || config.callbackURL,
        }, function (accessToken, refreshToken, expires_in, profile, done) {
            process.nextTick(function () {
                return done(null, { accessToken: accessToken, refreshToken: refreshToken, expires_in: expires_in, profile: profile });
            });
        });
    };
    return Spotify;
}());
exports.Spotify = Spotify;
