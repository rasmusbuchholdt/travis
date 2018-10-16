"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bluebird_1 = require("bluebird");
var plexApi = require("plex-api");
var Plex = /** @class */ (function () {
    function Plex(ip, port, token) {
        this.client = new plexApi({ hostname: ip, port: port, token: token });
    }
    Plex.prototype.validateToken = function () {
        var _this = this;
        return new bluebird_1.Promise(function (resolve, reject) {
            _this.client.query("/").then(function (result) {
                resolve(true);
            }, function (error) {
                resolve(false);
            });
        });
    };
    return Plex;
}());
exports.Plex = Plex;
