declare let $: any;
declare let Artyom: any;
let travis = new Artyom();

travis.addCommands([
    {
        indexes: ["Restart"],
        action: (index: number) => {
            travis.restart().then(() => {
                travis.say("I'm back!");
            });
        }
    },
    {
        indexes: ["Log out", "Logout", "Remove cookies", "Clear cookies", "Signout", "Sign out"],
        action: (index: number) => {
            $(location).attr("href", "/logout");
        }
    },
    {
        indexes: ["Shut up", "Be quiet"],
        action: (index: number) => {
            travis.restart().then(() => {
                travis.shutUp();
            });
        }
    },
    {
        indexes: ["Stop listening"],
        action: (index: number) => {
            travis.dontObey();
            travis.say("I'm not listening anymore.");
        }
    },
    {
        indexes: ["Repeat that", "Say again"],
        action: (index: number) => {
            travis.repeatLastSay();
        }
    },
    {
        indexes: ["What day is it"],
        action: (index: number) => {
            getDay();
        }
    },
    {
        indexes: ["What month is it"],
        action: (index: number) => {
            getMonth();
        }
    },
    {
        indexes: ["Tell me a joke", "Entertain me"],
        action: (index: number) => {
            getJoke();
        }
    },
    {
        indexes: ["Enter debug"],
        action: (index: number) => {
            travis.setDebug(true);
        }
    },
    {
        indexes: ["Leave debug"],
        action: (index: number) => {
            travis.setDebug(false);
        }
    },
    {
        indexes: ["What is the definition for *", "What does * mean"],
        smart: true,
        action: (index: number, wildcard: string) => {
            getDefinition(wildcard);
        }
    },
    {
        indexes: ["* spotify", "spotify *", "* song", "song *", "* music", "music *", "* volume", "volume *"],
        smart: true,
        action: (index: number, wildcard: string) => {
            controlSpotify(wildcard);
        }
    },
    {
        indexes: ["play *"],
        smart: true,
        action: (index: number, wildcard: string) => {
            controlSpotify(`play ${wildcard}`);
        }
    },
    {
        indexes: ["Push *"],
        smart: true,
        action: (index: number, wildcard: string) => {
            controlPushbullet(wildcard);
        }
    },
    {
        indexes: ["Repeat after me *"],
        smart: true,
        action: (index: number, wildcard: string) => {
            travis.say(`You've said : ${wildcard}`);
        }
    }
]);

travis.redirectRecognizedTextOutput((recognized: string, isFinal: boolean) => {
    if (travis.isSpeaking()) return;
    if (isFinal) {
        $("#search").val(recognized);
    } else {
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
}).then(() => {
    console.log("travis has been succesfully initialized");
}).catch((error) => {
    console.error(`travis couldn't be initialized: ${error}`);
});