$(document).ready(function () {

    var getProfile = new XMLHttpRequest();

    var token;
    token = sessionStorage.getItem("token");

    if (token == null) {
        console.log("User is not login");
    } else {

        getProfile.open("GET", "https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/user/" + token, true);
        getProfile.onload = function () {

            var profile = JSON.parse(getProfile.responseText);
            sessionStorage.setItem("profile", JSON.stringify(profile));

            //console.log(getProfile.responseText);
            
        }
    }

    getProfile.send();

})
