console.log("Starting build script..");
let fs = require("fs-extra");

console.log("Copying client directory..");
fs.copy(__dirname + "/../src/client", __dirname + "/client")
    .then(() => {
        console.log('.. Success!')
    })
    .catch(error => {
        console.error(error)
    })