let express = require("express");
let path = require("path");
let bodyparser = require("body-parser");
let HTTP = require("http-status-codes");
let config = require("../config/app.json");

let app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use((req: any, resp: any, next: any) => {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    resp.header("Access-Control-Allow-Methods", "GET, PUT");
    next();
});

app.set("port", (process.env.PORT || config.port));

app.get("/", (req: any, resp: any) => {
    resp.sendFile(path.join(__dirname + "/client/index.html"));
});

app.get("/js/main.js", (req: any, resp: any) => {
    resp.sendFile(path.join(__dirname + "/client/js/main.js"));
});

app.get("/js/travis.js", (req: any, resp: any) => {
    resp.sendFile(path.join(__dirname + "/client/js/travis.js"));
});

app.get("/js/artyom.window.js", (req: any, resp: any) => {
    resp.sendFile(path.join(__dirname + "/../node_modules/artyom.js/build/artyom.window.min.js"));
});

app.get("/css/style.css", (req: any, resp: any) => {
    resp.sendFile(path.join(__dirname + "/client/css/style.css"));
});

app.get("/api/", (req: any, resp: any) => {
    return resp.status(HTTP.OK).json(`It works!`);
});

app.listen(app.get("port"), () => {
    console.log(`Listening on port ${app.get("port")}`);
});