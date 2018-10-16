let spotifyStrategy = require("passport-spotify").Strategy;
let request = require('request-promise');

let config = require("../../config/app.json");

export class Spotify {

    private accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    };

    controlPlayback(action: string) {
        if (["play", "start", "resume"].indexOf(action) > -1) {
            this.resume();
        } else if (["stop", "pause"].indexOf(action) > -1) {
            this.pause();
        } else if (["next", "skip"].indexOf(action) > -1) {
            this.next();
        } else if (["previous"].indexOf(action) > -1) {
            this.previous();
        } else if (["shuffle", "random"].indexOf(action) > -1) {
            this.shuffle();
        } else if (["restart", "replay", "repeat"].indexOf(action) > -1) {
            this.restart();
        }
    }

    private previous() {
        let options: {} = {
            method: "POST",
            uri: "https://api.spotify.com/v1/me/player/previous",
            headers: {
                Authorization: ` Bearer ${this.accessToken}`
            }
        };
        request(options)
        .catch(error => {
            console.error(error);
        });
    }

    private next() {
        let options: {} = {
            method: "POST",
            uri: "https://api.spotify.com/v1/me/player/next",
            headers: {
                Authorization: ` Bearer ${this.accessToken}`
            }
        };
        request(options)
        .catch(error => {
            console.error(error);
        });
    }

    private resume() {
        let options: {} = {
            method: "PUT",
            uri: "https://api.spotify.com/v1/me/player/play",
            headers: {
                Authorization: ` Bearer ${this.accessToken}`
            }
        };
        request(options)
        .catch(error => {
            console.error(error);
        });
    }

    private pause() {
        let options: {} = {
            method: "PUT",
            uri: "https://api.spotify.com/v1/me/player/pause",
            headers: {
                Authorization: ` Bearer ${this.accessToken}`
            }
        };
        request(options)
        .catch(error => {
            console.error(error);
        });
    }

    private shuffle() {
        let options: {} = {
            method: "PUT",
            uri: "https://api.spotify.com/v1/me/player/shuffle?state=true",
            headers: {
                Authorization: ` Bearer ${this.accessToken}`
            }
        };
        request(options)
        .catch(error => {
            console.error(error);
        });
    }

    private restart() {
        let options: {} = {
            method: "PUT",
            uri: "https://api.spotify.com/v1/me/player/seek?position_ms=0",
            headers: {
                Authorization: ` Bearer ${this.accessToken}`
            }
        };
        request(options)
        .catch(error => {
            console.error(error);
        });
    }
W
    static authStrategy() {
        return new spotifyStrategy(
            {
            clientID: process.env.spotityClientID ||config.spotityClientID,
            clientSecret: process.env.spotifyClientSecret || config.spotifyClientSecret,
            callbackURL: process.env.callbackURL || config.callbackURL,
            },
            (accessToken, refreshToken, expires_in, profile, done) => {
                process.nextTick(() => {
                    return done(null, { accessToken, refreshToken, expires_in, profile });
                });
            }
        )
    }
}