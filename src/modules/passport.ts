import { Spotify } from "./spotify";

export class Passport {

    private passport = require("passport");

    constructor() {
        this.passport.serializeUser((user: any, done: any) => {
            done(null, user);
        });

        this.passport.deserializeUser((obj: any, done: any) => {
            done(null, obj);
        });

        this.passport.use(Spotify.authStrategy());
    }

    getPassport() {
        return this.passport;
    }
}