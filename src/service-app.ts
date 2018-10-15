export{};

let express = require("express");
let bodyparser = require("body-parser");
let HTTP = require("http-status-codes");
let config = require("../config/service-app.json");

let app = express();

app.set("port", (process.env.PORT || config.port));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use((req: any, resp: any, next: any) => {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    resp.header("Access-Control-Allow-Methods", "GET");
    resp.header("Content-Type", "application/json");
    next();
});

app.get("/api/", (req: any, resp: any) => {
    return resp.status(HTTP.OK).json(`It works!`);
});

app.listen(app.get("port"), () => {
    console.log(`Listening on port ${app.get("port")}`);
});