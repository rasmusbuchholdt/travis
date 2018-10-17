var artyom = new Artyom();
artyom.addCommands([
    {
        indexes: ["Restart"],
        action: function (i) {
            artyom.restart().then(function () {
                artyom.say("I'm back!");
            });
        }
    },
    {
        indexes: ["Log out", "Logout", "Remove cookies", "Clear cookies"],
        action: function (i) {
            $(location).attr("href", "/logout");
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
            artyom.say("I'm not listening anymore.");
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
        indexes: ["What month is it"],
        action: function (i) {
            getMonth();
        }
    },
    {
        indexes: ["Tell me a joke", "Entertain me"],
        action: function (i) {
            getJoke();
        }
    },
    {
        indexes: ["Enter debug"],
        action: function (i) {
            artyom.setDebug(true);
        }
    },
    {
        indexes: ["Leave debug"],
        action: function (i) {
            artyom.setDebug(false);
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
        indexes: ["* spotify", "* song", "* the music", "* music", "spotify *"],
        smart: true,
        action: function (i, wildcard) {
            controlSpotify(wildcard);
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
    if (artyom.isSpeaking())
        return;
    if (isFinal) {
        $("#search").val(recognized);
    }
    else {
        $("#search").attr("placeholder", recognized).val("").focus().blur();
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
