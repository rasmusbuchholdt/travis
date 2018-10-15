var artyom = new Artyom();
artyom.addCommands([
    {
        indexes: ["What day is it"],
        action: function (i) {
            getDay();
        }
    },
    {
        indexes: ["Test"],
        action: function (i) {
            apiTest();
        }
    },
    {
        indexes: ['Repeat after me *'],
        smart: true,
        action: function (i, wildcard) {
            artyom.say("You've said : " + wildcard);
        }
    }
]);
artyom.redirectRecognizedTextOutput(function (recognized, isFinal) {
    if (isFinal) {
        console.log("Final recognized text: " + recognized);
    }
    else {
        console.log(recognized);
    }
});
artyom.initialize({
    lang: "en-GB",
    continuous: true,
    soundex: true,
    debug: true,
    executionKeyword: "and do it now",
    listen: true,
    name: "Jarvis"
}).then(function () {
    console.log("Artyom has been succesfully initialized");
}).catch(function (error) {
    console.error("Artyom couldn't be initialized: " + error);
});
function getDay() {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var date = new Date();
    artyom.say("" + days[date.getDay()]);
}
function getMonth() {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date();
    artyom.say("" + months[date.getMonth()]);
}
function apiTest() {
    $.ajax({
        url: "/api/",
        success: function (result) {
            artyom.say("API test " + result);
        }
    });
}
