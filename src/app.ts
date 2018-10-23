import { Spotify } from "./modules/spotify";
import { Plex } from "./modules/plex";
import { Pushbullet } from "./modules/pushbullet";
import { randomString } from "./modules/utils";

let express = require("express");
let path = require("path");
let ud = require("urban-dictionary");
let bodyparser = require("body-parser");
let compression = require("compression")
let HTTP = require("http-status-codes");
let config = require("../config/app.json");
let redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

let app = express();
app.use(compression());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(redirectToHTTPS([/localhost:(\d{4})/]));
app.use(express.static(__dirname + "/client"));

app.use((req: any, resp: any, next: any) => {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    resp.header("Access-Control-Allow-Methods", "GET, PUT");
    next();
});

app.set("port", (process.env.PORT || config.port));

app.get("/js/artyom.window.min.js", (req: any, resp: any) => {
    resp.sendFile(path.join(__dirname + "/../node_modules/artyom.js/build/artyom.window.min.js"));
});

app.put("/api/urban-dictionary", (req: any, resp: any) => {
    ud.term(req.body.term).then((result) => {
        return resp.status(HTTP.OK).json(result.entries[0].definition);
    });
});

app.put("/api/spotify/control", (req: any, resp: any) => {
    new Spotify(req.body.accessToken).handleAction(req.body.action);
    return resp.status(HTTP.OK).send();
});

app.put("/api/spotify/validate", (req: any, resp: any) => {
    new Spotify(req.body.accessToken).validateToken().then(result => {
        return resp.status(HTTP.OK).json(result);
    })
});

app.put("/api/plex/validate", (req: any, resp: any) => {
    new Plex(req.body.ip, req.body.port, req.body.accessToken).validateToken().then(result => {
        return resp.status(HTTP.OK).json(result);
    })
});

app.put("/api/pushbullet/validate", (req: any, resp: any) => {
    new Pushbullet(req.body.accessToken).validateToken().then(result => {
        return resp.status(HTTP.OK).json(result);
    })
});

app.put("/api/pushbullet/control", (req: any, resp: any) => {
    new Pushbullet(req.body.accessToken).handleAction(req.body.action);
    return resp.status(HTTP.OK).send();
});

app.get("/api/plex/auth", (req: any, resp: any) => {
    Plex.getPin().then(result => {
        return resp.status(HTTP.OK).json(result);
    })
});

app.put("/api/plex/auth", (req: any, resp: any) => {
    Plex.checkPin(req.body.requestId).then(result => {
        return resp.status(HTTP.OK).json(result);
    })
});

app.get("/auth/pushbullet", (req: any, resp: any) => {
    resp.redirect(Pushbullet.getAuthURL());
});

app.get("/auth/pushbullet/callback", (req: any, resp: any) => {
    Pushbullet.getToken(req.query.code).then(result => {
        resp.cookie("pushbullet_accessToken", result, { expires: new Date(Date.now() + 90000000000) });
        resp.redirect("/");
    });
});

app.get("/auth/spotify", (req: any, resp: any) => {
    let state: string = randomString(16);
    resp.cookie("spotify_auth_state", state);
    resp.redirect(Spotify.getAuthURL(state));
});

app.get("/auth/spotify/callback", (req: any, resp: any) => {
    let code = req.query.code || null;
    // TODO
    // let state = req.query.state || null;
    // let storedState = req.cookies ? req.cookies["spotify_auth_state"] : null;
    // if (!state || state !== storedState) return resp.redirect("/");
    resp.clearCookie("spotify_auth_state");

    Spotify.getToken(code).then(result => {
        resp.cookie("spotify_accessToken", result.access_token, { expires: new Date(Date.now() + 90000000000) });
        resp.redirect("/");
    });
});

app.get("/logout", (req: any, resp: any) => {
    req.logout();
    resp.clearCookie("spotify_accessToken");
    resp.clearCookie("plex_ip");
    resp.clearCookie("plex_port");
    resp.clearCookie("plex_accessToken");
    resp.redirect("/");
});

app.listen(app.get("port"), () => {
    console.log(`Listening on port ${app.get("port")}`);
});