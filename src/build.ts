let fs = require("fs-extra");

function copyClientDirectory() {
    fs.copy(__dirname + "/../src/client", __dirname + "/client")
    .then(() => {
        console.log(".. Successfully copied client directory!");
        emtpyClientCss();
    })
    .catch(error => {
        console.error(error)
    });
}

function emtpyClientCss() {
    fs.emptyDir(__dirname + "/client/css")
    .then(() => {
        console.log(".. Successfully deleted client css!");
        //emptyClientJs();
    })
    .catch(error => {
        console.error(error)
    });
}

function emptyClientJs() {
    fs.emptyDir(__dirname + "/client/js")
    .then(() => {
        console.log(".. Successfully deleted client js!");
    })
    .catch(error => {
        console.error(error)
    });
}

console.log("Starting build script..");
copyClientDirectory();