declare let $: any;
declare let Artyom: any;
let artyom = new Artyom();

artyom.addCommands([
    {
        indexes:["Restart"],
        action: (i) => {
            artyom.restart().then(() => {
                handleResponse("I'm back!");
            });
        }
    },
    {
        indexes:["Stop listening"],
        action: (i) => {
            artyom.dontObey();
            handleResponse("I'm not listening anymore.");
        }
    },
    {
        indexes:["Repeat that", "Say again"],
        action: (i) => {
            artyom.repeatLastSay();
        }
    },
    {
        indexes: ["What day is it"],
        action: (i) => {
            getDay();
        }
    },
    {
        indexes: ["Tell me a joke"],
        action: (i) => {
            getJoke();
        }
    },
    {
        indexes: ["Repeat after me *"],
        smart:true,
        action: (i,wildcard) => {
            artyom.say(`You've said : ${wildcard}`);
        }
    } 
]);

artyom.redirectRecognizedTextOutput(function(recognized: string, isFinal: boolean){
    if(isFinal) {
        $("#speech").html(recognized);
    } else {
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
}).then(() => {
    console.log("Artyom has been succesfully initialized");
}).catch((error) => {
    console.error(`Artyom couldn't be initialized: ${error}`);
});

function handleResponse(response: string) {
    artyom.say(response);
    $("#response").html(response);
}

function getDay() {
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let date = new Date();
    handleResponse(`${days[date.getDay()]}`);
}

function getMonth() {
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let date = new Date();
    handleResponse(`${months[date.getMonth()]}`);
}

function apiTest() {
    $.ajax({
        url: "/api/", 
        success: function(result: any) {
            handleResponse(`API test ${result}`);
        }
    });
}

function getJoke() {
    $.ajax({
        url: "https://icanhazdadjoke.com/",
        headers: {          
            Accept: "application/json"
        }, 
        success: function(result: any) {
            handleResponse(result.joke);
        }
    }); 
}