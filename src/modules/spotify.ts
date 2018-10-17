import { Promise } from "bluebird";
import { arrayContains, getStringNumber } from "./utils";

let spotifyStrategy = require("passport-spotify").Strategy;
let request = require('request-promise');

let config = require("../../config/app.json");

export class Spotify {

    private accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    };

    validateToken() {
        let options: {} = {
            method: "GET",
            uri: "https://api.spotify.com/v1/me/player",
            json: true,
            headers: {
                Authorization: ` Bearer ${this.accessToken}`
            }
        };

        return new Promise((resolve: any, reject: any) => {
            request(options)
                .then(result => {
                    resolve(true);
                })
                .catch(error => {
                    resolve(false);
                });
        });
    }

    handleAction(action: string) {
        let words: string[] = [];
        words = action.toLowerCase().split(" ");
        if (arrayContains(words, ["play", "start", "resume"])) {
            this.resume();
        } else if (arrayContains(words, ["stop", "pause"])) {
            this.pause();
        } else if (arrayContains(words, ["next", "skip"])) {
            this.next();
        } else if (arrayContains(words, ["previous"])) {
            this.previous();
        } else if (arrayContains(words, ["shuffle", "random"])) {
            this.shuffle();
        } else if (arrayContains(words, ["restart", "replay", "repeat"])) {
            this.restart();
        } else if (arrayContains(words, ["down"])) {
            this.volumeDown(getStringNumber(action, 10));
        } else if (arrayContains(words, ["up"])) {
            this.volumeUp(getStringNumber(action, 10));
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
        request(options);
    }

    private next() {
        let options: {} = {
            method: "POST",
            uri: "https://api.spotify.com/v1/me/player/next",
            headers: {
                Authorization: ` Bearer ${this.accessToken}`
            }
        };
        request(options);
    }

    private resume() {
        let options: {} = {
            method: "PUT",
            uri: "https://api.spotify.com/v1/me/player/play",
            headers: {
                Authorization: ` Bearer ${this.accessToken}`
            }
        };
        request(options);
    }

    private pause() {
        let options: {} = {
            method: "PUT",
            uri: "https://api.spotify.com/v1/me/player/pause",
            headers: {
                Authorization: ` Bearer ${this.accessToken}`
            }
        };
        request(options);
    }

    private shuffle() {
        let options: {} = {
            method: "PUT",
            uri: "https://api.spotify.com/v1/me/player/shuffle?state=true",
            headers: {
                Authorization: ` Bearer ${this.accessToken}`
            }
        };
        request(options);
    }

    private restart() {
        let options: {} = {
            method: "PUT",
            uri: "https://api.spotify.com/v1/me/player/seek?position_ms=0",
            headers: {
                Authorization: ` Bearer ${this.accessToken}`
            }
        };
        request(options);
    }

    private volumeUp(amount: number) {
        this.getVolume().then(result => {
            let options: {} = {
                method: "PUT",
                uri: `https://api.spotify.com/v1/me/player/volume?volume_percent=${result.volumePercent + amount}`,
                headers: {
                    Authorization: ` Bearer ${this.accessToken}`
                }
            };
            request(options);
        });
    }

    private volumeDown(amount: number = null) {
        this.getVolume().then(result => {
            let options: {} = {
                method: "PUT",
                uri: `https://api.spotify.com/v1/me/player/volume?volume_percent=${result.volumePercent - amount || 10}`,
                headers: {
                    Authorization: ` Bearer ${this.accessToken}`
                }
            };
            request(options);
        });
    }

    private getVolume() {
        let options: {} = {
            method: "GET",
            uri: "https://api.spotify.com/v1/me/player",
            json: true,
            headers: {
                Authorization: ` Bearer ${this.accessToken}`
            }
        };

        return new Promise((resolve: any, reject: any) => {
            request(options)
                .then(result => {
                    resolve({ deviceType: result.device.type.toLowerCase(), volumePercent: result.device.volume_percent })
                });
        });
    }

    static authStrategy() {
        return new spotifyStrategy(
            {
                clientID: process.env.spotityClientID || config.spotityClientID,
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