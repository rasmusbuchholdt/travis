let fs = require("fs-extra");

console.log("Starting build script..");
fs.copy(__dirname + "/../src/client", __dirname + "/client")
    .then(() => {
        console.log(".. Successfully copied client directory!");
    })
    .catch(error => {
        console.error(error)
    });


fs.emptyDir(__dirname + "/client/css")
    .then(() => {
        console.log(".. Successfully deleted client css!");
    })
    .catch(error => {
        console.error(error)
    });

// fs.emptyDir(__dirname + "/client/js")
//     .then(() => {
//         console.log(".. Successfully deleted client js!");
//     })
//     .catch(error => {
//         console.error(error)
//     });