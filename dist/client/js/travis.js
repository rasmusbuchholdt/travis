var travis = new Artyom();
travis.addCommands([
    {
        indexes: ["Restart"],
        action: function (index) {
            travis.restart().then(function () {
                travis.say("I'm back!");
            });
        }
    },
    {
        indexes: ["Log out", "Logout", "Remove cookies", "Clear cookies", "Signout", "Sign out"],
        action: function (index) {
            $(location).attr("href", "/logout");
        }
    },
    {
        indexes: ["Shut up", "Be quiet"],
        action: function (index) {
            travis.restart().then(function () {
                travis.shutUp();
            });
        }
    },
    {
        indexes: ["Stop listening"],
        action: function (index) {
            travis.dontObey();
            travis.say("I'm not listening anymore.");
        }
    },
    {
        indexes: ["Repeat that", "Say again"],
        action: function (index) {
            travis.repeatLastSay();
        }
    },
    {
        indexes: ["What day is it"],
        action: function (index) {
            getDay();
        }
    },
    {
        indexes: ["What month is it"],
        action: function (index) {
            getMonth();
        }
    },
    {
        indexes: ["Tell me a joke", "Entertain me"],
        action: function (index) {
            getJoke();
        }
    },
    {
        indexes: ["Enter debug"],
        action: function (index) {
            travis.setDebug(true);
        }
    },
    {
        indexes: ["Leave debug"],
        action: function (index) {
            travis.setDebug(false);
        }
    },
    {
        indexes: ["What is the definition for *", "What does * mean"],
        smart: true,
        action: function (index, wildcard) {
            getDefinition(wildcard);
        }
    },
    {
        indexes: ["* spotify", "spotify *", "* song", "song *", "* music", "music *", "* volume", "volume *", "* playback", "playback *", "* play", "play *"],
        smart: true,
        action: function (index, wildcard) {
            controlSpotify(wildcard);
        }
    },
    {
        indexes: ["Repeat after me *"],
        smart: true,
        action: function (index, wildcard) {
            travis.say("You've said : " + wildcard);
        }
    }
]);
travis.redirectRecognizedTextOutput(function (recognized, isFinal) {
    if (travis.isSpeaking())
        return;
    if (isFinal) {
        $("#search").val(recognized);
    }
    else {
        $("#search").attr("placeholder", recognized).val("").focus().blur();
    }
});
travis.initialize({
    lang: "en-GB",
    continuous: true,
    soundex: true,
    debug: true,
    obeyKeyword: "start listening",
    executionKeyword: "and do it now",
    listen: true,
    name: "Travis"
}).then(function () {
    console.log("travis has been succesfully initialized");
}).catch(function (error) {
    console.error("travis couldn't be initialized: " + error);
});
