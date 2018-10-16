declare let $: any;
declare let Artyom: any;
let artyom = new Artyom();

artyom.addCommands([
    {
        indexes:["Restart"],
        action: (i: any) => {
            artyom.restart().then(() => {
                artyom.say("I'm back!");
            });
        }
    },
    {
        indexes:["Shut up", "Be quiet"],
        action: (i: any) => {
            artyom.restart().then(() => {
                artyom.shutUp();
            });
        }
    },
    {
        indexes:["Stop listening"],
        action: (i: any) => {
            artyom.dontObey();
            artyom.say("I'm not listening anymore.");
        }
    },
    {
        indexes:["Repeat that", "Say again"],
        action: (i: any) => {
            artyom.repeatLastSay();
        }
    },
    {
        indexes: ["What day is it"],
        action: (i: any) => {
            getDay();
        }
    },
    {
        indexes: ["What month is it"],
        action: (i: any) => {
            getMonth();
        }
    },
    {
        indexes: ["Tell me a joke", "Entertain me"],
        action: (i: any) => {
            getJoke();
        }
    },
    {
        indexes: ["Enter debug"],
        action: (i: any) => {
            artyom.setDebug(true);
        }
    },
    {
        indexes: ["Leave debug"],
        action: (i: any) => {
            artyom.setDebug(false);
        }
    },
    {
        indexes: ["What is the definition for *", "What does * mean"],
        smart:true,
        action: (i: any, wildcard: string) => {
            getDefinition(wildcard);
        }
    },
    {
        indexes: ["* spotify", "* song", "* the music", "* music", "spotify *"],
        smart:true,
        action: (i: any, wildcard: string) => {
            controlSpotify(wildcard);
        }
    },
    {
        indexes: ["Repeat after me *"],
        smart:true,
        action: (i: any, wildcard: string) => {
            artyom.say(`You've said : ${wildcard}`);
        }
    } 
]);

artyom.redirectRecognizedTextOutput(function(recognized: string, isFinal: boolean){
    if (artyom.isSpeaking()) return;
    if(isFinal) {
        $("#search").val(recognized);
    } else {
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
}).then(() => {
    console.log("Artyom has been succesfully initialized");
}).catch((error) => {
    console.error(`Artyom couldn't be initialized: ${error}`);
});