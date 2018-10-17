"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bluebird_1 = require("bluebird");
var utils_1 = require("./utils");
var spotifyStrategy = require("passport-spotify").Strategy;
var request = require('request-promise');
var config = require("../../config/app.json");
var Spotify = /** @class */ (function () {
    function Spotify(accessToken) {
        this.accessToken = accessToken;
    }
    ;
    Spotify.prototype.validateToken = function () {
        var options = {
            method: "GET",
            uri: "https://api.spotify.com/v1/me/player",
            json: true,
            headers: {
                Authorization: " Bearer " + this.accessToken
            }
        };
        return new bluebird_1.Promise(function (resolve, reject) {
            request(options)
                .then(function (result) {
                resolve(true);
            })
                .catch(function (error) {
                resolve(false);
            });
        });
    };
    Spotify.prototype.handleAction = function (action) {
        var words = [];
        words = action.toLowerCase().split(" ");
        if (utils_1.arrayContains(words, ["play", "start", "resume"])) {
            this.resume();
        }
        else if (utils_1.arrayContains(words, ["stop", "pause"])) {
            this.pause();
        }
        else if (utils_1.arrayContains(words, ["next", "skip"])) {
            this.next();
        }
        else if (utils_1.arrayContains(words, ["previous"])) {
            this.previous();
        }
        else if (utils_1.arrayContains(words, ["shuffle", "random"])) {
            this.shuffle();
        }
        else if (utils_1.arrayContains(words, ["restart", "replay", "repeat"])) {
            this.restart();
        }
        else if (utils_1.arrayContains(words, ["down"])) {
            this.volumeDown(utils_1.getStringNumber(action, 10));
        }
        else if (utils_1.arrayContains(words, ["up"])) {
            this.volumeUp(utils_1.getStringNumber(action, 10));
        }
        else if (utils_1.arrayContains(words, ["pc", "computer", "laptop", "mobile", "phone", "smartphone", "tv", "television", "speaker", "speakers"])) {
            this.transferPlayback(words);
        }
    };
    Spotify.prototype.previous = function () {
        var options = {
            method: "POST",
            uri: "https://api.spotify.com/v1/me/player/previous",
            headers: {
                Authorization: " Bearer " + this.accessToken
            }
        };
        request(options);
    };
    Spotify.prototype.next = function () {
        var options = {
            method: "POST",
            uri: "https://api.spotify.com/v1/me/player/next",
            headers: {
                Authorization: " Bearer " + this.accessToken
            }
        };
        request(options);
    };
    Spotify.prototype.resume = function () {
        var options = {
            method: "PUT",
            uri: "https://api.spotify.com/v1/me/player/play",
            headers: {
                Authorization: " Bearer " + this.accessToken
            }
        };
        request(options);
    };
    Spotify.prototype.pause = function () {
        var options = {
            method: "PUT",
            uri: "https://api.spotify.com/v1/me/player/pause",
            headers: {
                Authorization: " Bearer " + this.accessToken
            }
        };
        request(options);
    };
    Spotify.prototype.shuffle = function () {
        var options = {
            method: "PUT",
            uri: "https://api.spotify.com/v1/me/player/shuffle?state=true",
            headers: {
                Authorization: " Bearer " + this.accessToken
            }
        };
        request(options);
    };
    Spotify.prototype.restart = function () {
        var options = {
            method: "PUT",
            uri: "https://api.spotify.com/v1/me/player/seek?position_ms=0",
            headers: {
                Authorization: " Bearer " + this.accessToken
            }
        };
        request(options);
    };
    Spotify.prototype.volumeUp = function (amount) {
        var _this = this;
        this.getVolume().then(function (result) {
            var options = {
                method: "PUT",
                uri: "https://api.spotify.com/v1/me/player/volume?volume_percent=" + (result.volumePercent + amount),
                headers: {
                    Authorization: " Bearer " + _this.accessToken
                }
            };
            request(options);
        });
    };
    Spotify.prototype.volumeDown = function (amount) {
        var _this = this;
        if (amount === void 0) { amount = null; }
        this.getVolume().then(function (result) {
            var options = {
                method: "PUT",
                uri: "https://api.spotify.com/v1/me/player/volume?volume_percent=" + (result.volumePercent - amount || 10),
                headers: {
                    Authorization: " Bearer " + _this.accessToken
                }
            };
            request(options);
        });
    };
    Spotify.prototype.transferPlayback = function (words) {
        var _this = this;
        var deviceTypeChoice = utils_1.determineDeviceType(words);
        if (!deviceTypeChoice)
            return;
        this.getDevices().then(function (result) {
            var deviceChoice;
            result.forEach(function (device) {
                if (device.type.toLowerCase() == deviceTypeChoice && device.is_active == false)
                    deviceChoice = device.id;
            });
            if (!deviceChoice)
                return;
            var options = {
                method: "PUT",
                uri: "https://api.spotify.com/v1/me/player",
                headers: {
                    Authorization: " Bearer " + _this.accessToken
                },
                body: JSON.stringify({
                    device_ids: [
                        deviceChoice
                    ]
                })
            };
            request(options);
        });
    };
    Spotify.prototype.getVolume = function () {
        var options = {
            method: "GET",
            uri: "https://api.spotify.com/v1/me/player",
            json: true,
            headers: {
                Authorization: " Bearer " + this.accessToken
            }
        };
        return new bluebird_1.Promise(function (resolve, reject) {
            request(options)
                .then(function (result) {
                resolve({ deviceType: result.device.type.toLowerCase(), volumePercent: result.device.volume_percent });
            });
        });
    };
    Spotify.prototype.getDevices = function () {
        var options = {
            method: "GET",
            uri: "https://api.spotify.com/v1/me/player/devices",
            json: true,
            headers: {
                Authorization: " Bearer " + this.accessToken
            }
        };
        return new bluebird_1.Promise(function (resolve, reject) {
            request(options)
                .then(function (result) {
                resolve(result.devices);
            });
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
