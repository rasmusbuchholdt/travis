"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spotify_1 = require("./spotify");
var Passport = /** @class */ (function () {
    function Passport() {
        this.passport = require("passport");
        this.passport.serializeUser(function (user, done) {
            done(null, user);
        });
        this.passport.deserializeUser(function (obj, done) {
            done(null, obj);
        });
        this.passport.use(spotify_1.Spotify.authStrategy());
    }
    Passport.prototype.getPassport = function () {
        return this.passport;
    };
    return Passport;
}());
exports.Passport = Passport;
