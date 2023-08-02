function registerMe() {

    var jsonData = new Object();
    jsonData.email = document.getElementById("signUpEmail").value;
    jsonData.username = document.getElementById("signUpUsername").value;
    jsonData.password = document.getElementById("signUpPassword").value;

    if (jsonData.email == '' || jsonData.username == '' || jsonData.password == '') {
        alert("All fields are required!")
    }

    else {
        var registerUser = new XMLHttpRequest();

        registerUser.open("POST", "https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/user", true);
        registerUser.onload = function () {

            response = JSON.parse(registerUser.responseText);
            // console.log('Logged', response);

            if (response.message == "") {
                $('#signUpModal').modal('hide');
                alert('Sign Up Successful!');
            } else {
                alert('Email or Username is already in Use!');
            }

        }

        registerUser.send(JSON.stringify(jsonData)); //converting the jsonData object into json string 

    }

}

function loginMe() {

    var jsonData = new Object();
    jsonData.email = document.getElementById("loginEmail").value;
    jsonData.password = document.getElementById("loginPassword").value;

    if (jsonData.email == '' || jsonData.password == '') {
        alert("Missing Fields!")
    }

    else {
        var loginUser = new XMLHttpRequest();
        loginUser.open("POST", "https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/login", true);
        loginUser.onload = function () {
            
            var response = JSON.parse(loginUser.responseText);
            console.log(response);

            if (response.token) {

                $('#loginModal').modal('hide');
                document.getElementById("signUpMenu").style.visibility = "hidden"
                document.getElementById("verticalLineMenu").style.visibility = "hidden"
                document.getElementById("loginMenu").style.visibility = "hidden"
                document.getElementById("profileMenu").style.visibility = "visible"
                sessionStorage.setItem('token', response.token);
                location.reload() // refreshes the page  when login so that profile will be added to session storage for loadingProfile.js

            } else if (response.error === "Invalid Credentials") {
                // Invalid credentials
                alert('Invalid Credentials!');
            } else {
                // Handle other possible errors
                alert('Login Failed. Please try again.');
            }
        }

        loginUser.send(JSON.stringify(jsonData));
    }

}

function logoutMe() {
    document.getElementById("signUpMenu").style.visibility = "visible"
    document.getElementById("verticalLineMenu").style.visibility = "visible"
    document.getElementById("loginMenu").style.visibility = "visible"
    document.getElementById("profileMenu").style.visibility = "hidden"
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("profile");
    sessionStorage.removeItem("cartID");
    sessionStorage.removeItem("cartTotalPrice");
    sessionStorage.removeItem("checkoutID");
    location.reload();
}

function logoutMeCart() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("profile");
    sessionStorage.removeItem("cartID");
    sessionStorage.removeItem("cartTotalPrice");
    sessionStorage.removeItem("checkoutID");
    location.reload();
}

function logoutMeCheckout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("profile");
    sessionStorage.removeItem("cartID");
    sessionStorage.removeItem("cartTotalPrice");
    sessionStorage.removeItem("checkoutID");
    location.reload();
}

function encode() {

    var selectedfile = document.getElementById("myinput").files;
    if (selectedfile.length > 0) {
        var imageFile = selectedfile[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            picture = fileLoadedEvent.target.result;
            document.getElementById("target").src = picture;
        }
        fileReader.readAsDataURL(imageFile);
    }

}

function updateMe() {

    var userName = document.getElementById("updateUsername").value
    var email = document.getElementById("updateEmail").value
    var phoneNumber = document.getElementById("updatePhoneNumber").value

    var token = sessionStorage.getItem('token');

    if (userName == "" || email == "") {
        alert("Username and Email must be Filled!")
    } else {

        var request = new XMLHttpRequest();

        request.open("PUT", "https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/user/" + token, true);
        request.onload = function () {
            var response = request.responseText;
            // console.log(response);
            alert('Profile Updated!')
        }

        request.send(JSON.stringify({ username: userName, email: email, phone_number: phoneNumber, profile_pic: picture }));
    }

}

function updatePassword() {

    var token = sessionStorage.getItem('token');

    var currentPassword = document.getElementById('currentPassword').value;
    var newPassword = document.getElementById('newPassword').value;
    var confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (currentPassword == "" || newPassword == "" || confirmNewPassword == ""){
        alert("Missing Fields")
    } else if (currentPassword != password) {
        alert('Current Password is Incorrect!')
    } else if (newPassword != confirmNewPassword) {
        alert("New Password and Confirm New Password does not match!")
    } else {

        var request = new XMLHttpRequest();
        request.open("PUT", "https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/user/password/" + token, true);
        request.onload = function () {
            var response = request.responseText;
            // console.log(response);
            logoutMe()
            window.location.href = "index.html"
        }

        request.send(JSON.stringify({password: newPassword}));
    }
}

function deleteAccount() {
    var confirmation = confirm("Are you sure you want to delete your account?");

    if (confirmation == true) {

        var token = sessionStorage.getItem('token');

        var request = new XMLHttpRequest();
        request.open("DELETE", "https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/user/" + token, true);
        request.onload = function () {
            var response = request.responseText;
            console.log(response);
            logoutMe()
            window.location.href = "index.html"
        }

        request.send();
    }
}

