$(document).ready(function () {

    var token = sessionStorage.getItem("token");
    if (token != null) {
        console.log('Cart and Checkout Page Authroized')
    } else {
        sessionStorage.removeItem("cartID");
        sessionStorage.removeItem("cartTotalPrice");
        window.location.href = 'index.html'
    }

})