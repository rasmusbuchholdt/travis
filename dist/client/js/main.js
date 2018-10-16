$(function () {
    if ($.cookie("spotify_accessToken") != null) {
        validateSpotifyToken();
    }
    ;
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
            artyom.say(result);
        }
    });
}
function controlSpotify(action) {
    $.ajax({
        type: "PUT",
        url: "/api/spotify/control",
        data: {
            accessToken: $.cookie("spotify_accessToken"),
            action: action.split(" ").join("").toLowerCase()
        }
    });
}
function validateSpotifyToken() {
    $.ajax({
        type: "PUT",
        url: "/api/spotify/validate",
        headers: {
            Accept: "application/json"
        },
        data: {
            accessToken: $.cookie("spotify_accessToken")
        },
        success: function (result) {
            if (result) {
                $("#spotify").removeClass("filtered");
            }
            else {
                $(location).attr("href", "/auth/spotify");
            }
            ;
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
            artyom.say(result.joke);
        }
    });
}
