import { Promise } from "bluebird";

let request = require('request-promise');

let config = require("../../config/app.json");

export class Pushbullet {

    private accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    };

    validateToken() {
        let options: {} = {
            method: "GET",
            uri: "https://api.pushbullet.com/v2/users/me",
            headers: {
                "Content-Type": "application/json",
                "Access-Token": this.accessToken
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

    static authUrl() {
        return `https://www.pushbullet.com/authorize?client_id=${config.pushbulletClientID || process.env.pushbulletClientID}&redirect_uri=${encodeURIComponent(config.pushbulletCallbackURL || process.env.pushbulletCallbackURL)}&response_type=code`;
    }

    static getToken(code: string) {
        let options: {} = {
            method: "POST",
            uri: `https://api.pushbullet.com/oauth2/token`,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                grant_type: "authorization_code",
                client_id: config.pushbulletClientID || process.env.pushbulletClientID,
                client_secret: config.pushbulletClientSecret || process.env.pushbulletClientSecret,
                code: code
            })
        };

        return new Promise((resolve: any, reject: any) => {
            request(options)
                .then(result => {
                    resolve(JSON.parse(result).access_token);
                });
        });
    }
}
