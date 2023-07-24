$(document).ready(function () {

    var token = sessionStorage.getItem("token");
    if (token != null) {
        console.log('Cart Page Authroized')
    } else {
        window.location.href = 'index.html'
    }

})