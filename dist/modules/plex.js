"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bluebird_1 = require("bluebird");
var plexApi = require("plex-api");
var PlexPin = require("plex-pin");
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
    Plex.getPin = function () {
        var plexPin = new PlexPin({
            'X-Plex-Product': 'Plex+Web',
            'X-Plex-Version': '2.3.21',
            'X-Plex-Client-Identifier': 'r4zsj3rp4r4wjyvi',
            'X-Plex-Platform': 'Chrome',
            'X-Plex-Platform-Version': '41.0',
            'X-Plex-Device': 'Linux',
            'X-Plex-Device-Name': 'Plex+Web+(Chrome)',
            'Accept-Language': 'en'
        });
        return new bluebird_1.Promise(function (resolve, reject) {
            plexPin.requestPin().then(function (result) {
                plexPin.setExpireTime(result);
                plexPin.setPin(result);
                plexPin.setRequestId(result);
                resolve({ pin: plexPin.getPin(), requestId: plexPin.getRequestId(), expiration: plexPin.getExpireTime() });
            });
        });
    };
    Plex.checkPin = function (requestId) {
        var plexPin = new PlexPin({
            'X-Plex-Product': 'Plex+Web',
            'X-Plex-Version': '2.3.21',
            'X-Plex-Client-Identifier': 'r4zsj3rp4r4wjyvi',
            'X-Plex-Platform': 'Chrome',
            'X-Plex-Platform-Version': '41.0',
            'X-Plex-Device': 'Linux',
            'X-Plex-Device-Name': 'Plex+Web+(Chrome)',
            'Accept-Language': 'en'
        });
        return new bluebird_1.Promise(function (resolve, reject) {
            plexPin.checkPin(requestId).then(function (result) {
                plexPin.setAuthToken(result);
                resolve(plexPin.getAuthToken());
            });
        });
    };
    return Plex;
}());
exports.Plex = Plex;
