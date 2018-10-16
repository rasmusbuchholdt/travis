let spotifyStrategy = require("passport-spotify").Strategy;
let request = require('request-promise');

let config = require("../../config/app.json");

export class Spotify {

    private accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    };

    controlPlayback(action: string) {
        switch (action) {
            case "previous":
                this.previous(this.accessToken);
                break;
            case "next":
                this.next(this.accessToken);
                break; 
            case "pause":
                this.pause(this.accessToken);
                break;   
            case "resume":
                this.resume(this.accessToken);
                break;    
            default:
                break;
        }
    }

    private previous(accessToken: string) {
        let options: {} = {
            method: "POST",
            uri: "https://api.spotify.com/v1/me/player/previous",
            headers: {
                Authorization: ` Bearer ${accessToken}`
            }
        };
        request(options)
        .catch(error => {
            console.error(error);
        });
    }

    private next(accessToken: string) {
        let options: {} = {
            method: "POST",
            uri: "https://api.spotify.com/v1/me/player/next",
            headers: {
                Authorization: ` Bearer ${accessToken}`
            }
        };
        request(options)
        .catch(error => {
            console.error(error);
        });
    }

    private resume(accessToken: string) {
        let options: {} = {
            method: "PUT",
            uri: "https://api.spotify.com/v1/me/player/play",
            headers: {
                Authorization: ` Bearer ${accessToken}`
            }
        };
        request(options)
        .catch(error => {
            console.error(error);
        });
    }

    private pause(accessToken: string) {
        let options: {} = {
            method: "PUT",
            uri: "https://api.spotify.com/v1/me/player/pause",
            headers: {
                Authorization: ` Bearer ${accessToken}`
            }
        };
        request(options)
        .catch(error => {
            console.error(error);
        });
    }

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