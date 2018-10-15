declare let $: any;
declare let Artyom: any;
let artyom = new Artyom();

artyom.addCommands([
    {
        indexes: ["What day is it"],
        action: (i) => {
            getDay();
        }
    },
    {
        indexes: ["Test"],
        action: (i) => {
            apiTest();
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

artyom.redirectRecognizedTextOutput(function(recognized,isFinal){
    if(isFinal) {
        $("#speech").html(recognized);
    } else {
        console.log(recognized);
        $("#speech").html(recognized);
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
        success: function(result : any){
            handleResponse(`API test ${result}`);
        }
    });
}