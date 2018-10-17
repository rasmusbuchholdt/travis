import { Promise } from "bluebird";

let plexApi = require("plex-api");
let PlexPin = require("plex-pin");

export class Plex {

    private client: any;

    constructor(ip: string, port: number, token: string) {
        this.client = new plexApi({ hostname: ip, port, token });
    }

    validateToken() {
        return new Promise((resolve: any, reject: any) => {
            this.client.query("/").then((result) => {
                resolve(true);
            }, (error) => {
                resolve(false);
            });
        });
    }

    static getPin() {
        let plexPin = new PlexPin({
            'X-Plex-Product': 'Plex+Web',
            'X-Plex-Version': '2.3.21',
            'X-Plex-Client-Identifier': 'r4zsj3rp4r4wjyvi',
            'X-Plex-Platform': 'Chrome',
            'X-Plex-Platform-Version': '41.0',
            'X-Plex-Device': 'Linux',
            'X-Plex-Device-Name': 'Plex+Web+(Chrome)',
            'Accept-Language': 'en'
        });

        return new Promise((resolve: any, reject: any) => {
            plexPin.requestPin().then(function (result) {
                plexPin.setExpireTime(result);
                plexPin.setPin(result);
                plexPin.setRequestId(result);
                resolve({ pin: plexPin.getPin(), requestId: plexPin.getRequestId(), expiration: plexPin.getExpireTime()});
            });
        });
    }

    static checkPin(requestId: string) {
        let plexPin = new PlexPin({
            'X-Plex-Product': 'Plex+Web',
            'X-Plex-Version': '2.3.21',
            'X-Plex-Client-Identifier': 'r4zsj3rp4r4wjyvi',
            'X-Plex-Platform': 'Chrome',
            'X-Plex-Platform-Version': '41.0',
            'X-Plex-Device': 'Linux',
            'X-Plex-Device-Name': 'Plex+Web+(Chrome)',
            'Accept-Language': 'en'
        });

        return new Promise((resolve: any, reject: any) => {
            plexPin.checkPin(requestId).then((result) => {
                plexPin.setAuthToken(result);
                resolve(plexPin.getAuthToken());
            });
        });
    }
}