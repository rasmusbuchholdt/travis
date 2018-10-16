import { Promise } from "bluebird";

let plexApi = require("plex-api");

export class Plex {

    private client: any;

    constructor(ip: string, port: number, token: string) {
        this.client = new plexApi({hostname: ip, port, token});
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
}