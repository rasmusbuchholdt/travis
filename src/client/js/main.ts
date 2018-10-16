function getDay() {
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let date = new Date();
    artyom.say(`${days[date.getDay()]}`);
}

function getMonth() {
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let date = new Date();
    artyom.say(`${months[date.getMonth()]}`);
}

function getDefinition(term: string) {
    $.ajax({
        type: "PUT",
        url: "/api/urban-dictionary",
        data: {
            term
        },
        headers: {          
            Accept: "application/json"
        }, 
        success: function(result: any) {
            artyom.say(result);
        }
    }); 
}

function controlSpotify(action: string) {
    $.ajax({
        type: "PUT",
        url: "/api/spotify/control",
        data: {
            accessToken: $.cookie("spotify_accessToken"),
            action: action.split(" ").join("").toLowerCase()
        }
    }); 
}

function getJoke() {
    $.ajax({
        url: "https://icanhazdadjoke.com/",
        headers: {          
            Accept: "application/json"
        }, 
        success: (result: any) => {
            artyom.say(result.joke);
        }
    }); 
}