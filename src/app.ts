let express = require("express");
let bodyparser = require("body-parser");
let config = require("../config/app.json");
let path = require("path");

let app = express();

app.set("port", (process.env.PORT || config.port));

app.get("/", (req: any, resp: any) => {
    resp.sendFile(path.join(__dirname + "/client/index.html"));
});

app.get("/main.js", (req: any, resp: any) => {
    resp.sendFile(path.join(__dirname + "/client/main.js"));
});

app.get("/main.css", (req: any, resp: any) => {
    resp.sendFile(path.join(__dirname + "/client/main.css"));
});

app.listen(app.get("port"), () => {
    console.log(`Listening on port ${app.get("port")}`);
});