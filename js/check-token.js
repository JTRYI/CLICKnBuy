$(document).ready(function () {

    var token = sessionStorage.getItem("token");
    if (token != null) {
        document.getElementById("signUpMenu").style.visibility = "hidden"
        document.getElementById("verticalLineMenu").style.visibility = "hidden"
        document.getElementById("loginMenu").style.visibility = "hidden"
        document.getElementById("profileMenu").style.visibility = "visible"
    } else {

    }

})