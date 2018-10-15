let express = require("express");
let path = require("path");
let ud = require("urban-dictionary");
let bodyparser = require("body-parser");
var compression = require("compression")
let HTTP = require("http-status-codes");
let config = require("../config/app.json");

let app = express();

app.use(compression());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client'));

app.use((req: any, resp: any, next: any) => {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    resp.header("Access-Control-Allow-Methods", "GET, PUT");
    next();
});

app.set("port", (process.env.PORT || config.port));

app.get("/js/artyom.window.js", (req: any, resp: any) => {
    resp.sendFile(path.join(__dirname + "/../node_modules/artyom.js/build/artyom.window.min.js"));
});

app.put("/api/urban-dictionary", (req: any, resp: any) => {
    let term: string = req.body.term;
    ud.term(term).then((result) => {
        const entries = result.entries
        // console.log(entries[0].word)
        // console.log(entries[0].definition)
        // console.log(entries[0].example)
        return resp.status(HTTP.OK).json(entries[0].definition);
    }).catch((error) => {
        console.error(error.message)
    });
});

app.listen(app.get("port"), () => {
    console.log(`Listening on port ${app.get("port")}`);
});