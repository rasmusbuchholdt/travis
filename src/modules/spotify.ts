let spotifyStrategy = require("passport-spotify").Strategy;

let config = require("../../config/app.json");

export class Spotify {

    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    static authStrategy() {
        return new spotifyStrategy(
            {
            clientID: config.spotityClientID,
            clientSecret: config.spotifyClientSecret,
            callbackURL: "/auth/spotify/callback"
            },
            (accessToken, refreshToken, expires_in, profile, done) => {
                process.nextTick(() => {
                    return done(null, { accessToken, refreshToken, expires_in, profile });
                });
            }
        )
    }
}