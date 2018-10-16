"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spotifyStrategy = require("passport-spotify").Strategy;
var request = require('request-promise');
var config = require("../../config/app.json");
var Spotify = /** @class */ (function () {
    function Spotify(accessToken) {
        this.accessToken = accessToken;
    }
    ;
    Spotify.prototype.controlPlayback = function (action) {
        if (["play", "start", "resume"].indexOf(action) > -1) {
            this.resume();
        }
        else if (["stop", "pause"].indexOf(action) > -1) {
            this.pause();
        }
        else if (["next", "skip"].indexOf(action) > -1) {
            this.next();
        }
        else if (["previous"].indexOf(action) > -1) {
            this.previous();
        }
        else if (["shuffle", "random"].indexOf(action) > -1) {
            this.shuffle();
        }
        ;
    };
    Spotify.prototype.previous = function () {
        var options = {
            method: "POST",
            uri: "https://api.spotify.com/v1/me/player/previous",
            headers: {
                Authorization: " Bearer " + this.accessToken
            }
        };
        request(options)
            .catch(function (error) {
            console.error(error);
        });
    };
    Spotify.prototype.next = function () {
        var options = {
            method: "POST",
            uri: "https://api.spotify.com/v1/me/player/next",
            headers: {
                Authorization: " Bearer " + this.accessToken
            }
        };
        request(options)
            .catch(function (error) {
            console.error(error);
        });
    };
    Spotify.prototype.resume = function () {
        var options = {
            method: "PUT",
            uri: "https://api.spotify.com/v1/me/player/play",
            headers: {
                Authorization: " Bearer " + this.accessToken
            }
        };
        request(options)
            .catch(function (error) {
            console.error(error);
        });
    };
    Spotify.prototype.pause = function () {
        var options = {
            method: "PUT",
            uri: "https://api.spotify.com/v1/me/player/pause",
            headers: {
                Authorization: " Bearer " + this.accessToken
            }
        };
        request(options)
            .catch(function (error) {
            console.error(error);
        });
    };
    Spotify.prototype.shuffle = function () {
        var options = {
            method: "PUT",
            uri: "https://api.spotify.com/v1/me/player/shuffle?state=true",
            headers: {
                Authorization: " Bearer " + this.accessToken
            }
        };
        request(options)
            .catch(function (error) {
            console.error(error);
        });
    };
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
