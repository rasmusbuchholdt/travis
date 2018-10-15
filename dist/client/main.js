var artyom = new Artyom();
artyom.addCommands([
    {
        indexes: ['Hello', 'Hi', 'is someone there'],
        action: function (i) {
            artyom.say("Hello, it's me");
        }
    },
    {
        indexes: ['Repeat after me *'],
        smart: true,
        action: function (i, wildcard) {
            artyom.say("You've said : " + wildcard);
        }
    },
    // The smart commands support regular expressions
    {
        indexes: [/Good Morning/i],
        smart: true,
        action: function (i, wildcard) {
            artyom.say("You've said : " + wildcard);
        }
    },
    {
        indexes: ['shut down yourself'],
        action: function (i, wildcard) {
            artyom.fatality().then(function () {
                console.log("Artyom succesfully stopped");
            });
        }
    },
]);
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
