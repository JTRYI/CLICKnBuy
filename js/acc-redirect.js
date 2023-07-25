$(document).ready(function () {

    var token = sessionStorage.getItem("token");
    if (token != null) {
        console.log('Account Page Authorized')
    } else {
      
        window.location.href = 'index.html'
    }

})