$(document).ready(function(){

    token = sessionStorage.getItem('token');

    var getProfile = new XMLHttpRequest();

    getProfile.open("GET", "https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/user/" + token, true);
    getProfile.onload = function(){

        var profile = JSON.parse(getProfile.responseText);
        console.log(profile);
        picture = profile[0].profile_pic;
        userName = profile[0].username;
        email = profile[0].email;
        phoneNumber = profile[0].phone_number;
        address = profile[0].address;
        password = profile[0].password;
        
        document.getElementById("updateUsername").value = userName;
        document.getElementById("updateEmail").value = email;
        document.getElementById("updatePhoneNumber").value = phoneNumber;
        document.getElementById("userAddress").textContent = address;
        
        if (picture == null) {

            document.getElementById("target").src = "images/avatar.png"; // if picture is null put default avatar as the picture

        } else {

            document.getElementById("target").src = picture; // if user already have picture set it to the same picture
        }
    }

    getProfile.send();
})