import { Promise } from 'bluebird';

import { arrayContains, handleNote } from './utils';

let request = require('request-promise');
let querystring = require('querystring');

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

    handleAction(action: string) {
        let words: string[] = [];
        words = action.toLowerCase().split(" ");
        if (arrayContains(words, ["note", "message"])) {
            this.pushNote(action);
        };
    }

    private pushNote(note: string) {
        note = handleNote(note);
        let options: {} = {
            method: "POST",
            uri: `https://api.pushbullet.com/v2/pushes`,
            headers: {
                "Content-Type": "application/json",
                "Access-Token": this.accessToken
            },
            body: JSON.stringify({
                type: "note",
                body: note
            })
        };
        request(options)
    }

    static getAuthURL() {
        return "https://www.pushbullet.com/authorize?" +
            querystring.stringify({
                client_id: config.pushbulletClientID || process.env.puFhbulletClientID,
                redirect_uri: config.pushbulletCallbackURL || process.env.pushbulletCallbackURL,
                response_type: "code"
            });
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
