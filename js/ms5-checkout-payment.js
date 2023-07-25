function goToCheckout() {

    var profile = JSON.parse(sessionStorage.getItem('profile'));

    var address = profile[0].address;
    // console.log("Address is", address);

    if (address == null) {
        // Open the "New Address" modal
        var newAddressModal = new bootstrap.Modal(document.getElementById('newAddressModal'));
        newAddressModal.show();
    } else {

        cartID = sessionStorage.getItem('cartID');

        var request = new XMLHttpRequest();

        request.open('POST', 'https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/checkout', true);
        request.onload = function () {

            var response = request.responseText;
            console.log(response);
            // Redirect the user to checkout.html
            window.location.href = 'checkout.html';
        }

        request.send(JSON.stringify({shipping_address: address, cartID: cartID}));
    }
}

function newAddress() {

    var postalCode = document.getElementById('postalCode').value;
    var buildings = document.getElementById('buildings').value;
    var unitNo = document.getElementById('unitNo').value;

    if (postalCode == '' || buildings == '' || unitNo == '') {
        alert('Missing Fields!')
    } else {
        var address = `${buildings} ${unitNo} (${postalCode})`;
        var token = sessionStorage.getItem('token');
        // console.log(address);

        var request = new XMLHttpRequest();

        request.open('PUT', 'https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/user/address/' + token, true);
        request.onload = function () {
            var response = request.responseText;
            console.log(response);
            alert('Address Confirmed. Proceed to Checkout.')
            location.reload();
        }

        request.send(JSON.stringify({ address: address }));
    }

}

function getCheckoutProducts() {

    cartID = sessionStorage.getItem('cartID');

    var request = new XMLHttpRequest();

    request.open('GET', 'https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/checkout/' + cartID, true);
    request.onload = function() {

        checkout_array = JSON.parse(request.responseText);
        console.log(checkout_array);
        displayCheckoutProducts();
    }

    request.send();
}

function displayCheckoutProducts() {

    var checkoutTotalPrice = sessionStorage.getItem('cartTotalPrice');
    checkoutTotalPrice = parseFloat(checkoutTotalPrice).toFixed(2);

    document.getElementById('checkoutBody').textContent = "";

    document.getElementById('address').textContent = checkout_array[0].shipping_address;
    document.getElementById('checkoutTotalPrice').textContent = '$' + checkoutTotalPrice;

    for (i = 0; i < checkout_array.length; i++) {

        var totalPriceProduct = checkout_array[i].total_price_product;
        totalPriceProduct = parseFloat(totalPriceProduct).toFixed(2);

    var html = `<div class="checkout-items-block">
        <div class="checkout-item-img-box">
            <img src="${checkout_array[i].product_img}" alt="">
        </div>
        <h4 class="checkout-item-title">${checkout_array[i].product_title}</h4>
        <div class="checkout-items-together">
            <h5 class="checkout-item-price" style="padding-right: 10px;">$${checkout_array[i].product_price}</h5>
            <h5 class="checkout-item-quantity">${checkout_array[i].quantity}</h5>
            <h5 class="checkout-total-item-price" style="padding-right: 22px; color:#30d5c8">$${totalPriceProduct}</h5>
            
        </div>
    </div>`
    document.getElementById("checkoutBody").insertAdjacentHTML('beforeend', html);

    }
}