var artyom = new Artyom();
artyom.addCommands([
    {
        indexes: ["Restart"],
        action: function (i) {
            artyom.restart().then(function () {
                handleResponse("I'm back!");
            });
        }
    },
    {
        indexes: ["Shut up", "Be quiet"],
        action: function (i) {
            artyom.restart().then(function () {
                artyom.shutUp();
            });
        }
    },
    {
        indexes: ["Stop listening"],
        action: function (i) {
            artyom.dontObey();
            handleResponse("I'm not listening anymore.");
        }
    },
    {
        indexes: ["Repeat that", "Say again"],
        action: function (i) {
            artyom.repeatLastSay();
        }
    },
    {
        indexes: ["What day is it"],
        action: function (i) {
            getDay();
        }
    },
    {
        indexes: ["Tell me a joke", "Entertain me"],
        action: function (i) {
            getJoke();
        }
    },
    {
        indexes: ["What is the definition for *", "What does * mean"],
        smart: true,
        action: function (i, wildcard) {
            getDefinition(wildcard);
        }
    },
    {
        indexes: ["Repeat after me *"],
        smart: true,
        action: function (i, wildcard) {
            artyom.say("You've said : " + wildcard);
        }
    }
]);
artyom.redirectRecognizedTextOutput(function (recognized, isFinal) {
    if (isFinal) {
        $("#speech").html(recognized);
    }
    else {
        $("#speech").html(recognized);
    }
});
artyom.initialize({
    lang: "en-GB",
    continuous: true,
    soundex: true,
    debug: true,
    obeyKeyword: "start listening",
    executionKeyword: "and do it now",
    listen: true,
    name: "Travis"
}).then(function () {
    console.log("Artyom has been succesfully initialized");
}).catch(function (error) {
    console.error("Artyom couldn't be initialized: " + error);
});
function handleResponse(response) {
    artyom.say(response);
    $("#response").html(response);
}
function getDay() {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var date = new Date();
    handleResponse("" + days[date.getDay()]);
}
function getMonth() {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date();
    handleResponse("" + months[date.getMonth()]);
}
function apiTest() {
    $.ajax({
        url: "/api/",
        success: function (result) {
            handleResponse("API test " + result);
        }
    });
}
function getDefinition(term) {
    $.ajax({
        type: "PUT",
        url: "/api/urban-dictionary",
        data: {
            term: term
        },
        headers: {
            Accept: "application/json"
        },
        success: function (result) {
            handleResponse(result);
        }
    });
}
function getJoke() {
    $.ajax({
        url: "https://icanhazdadjoke.com/",
        headers: {
            Accept: "application/json"
        },
        success: function (result) {
            handleResponse(result.joke);
        }
    });
}
