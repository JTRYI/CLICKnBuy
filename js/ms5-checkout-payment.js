function goToCheckout() {

    var profile = JSON.parse(sessionStorage.getItem('profile'));

    var address = profile[0].address;
    // console.log("Address is", address);


    if (cart_array.length === 0) {
        alert('Cart is Empty!')
    } else {
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

            request.send(JSON.stringify({ shipping_address: address, cartID: cartID }));
        }
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
    request.onload = function () {

        checkout_array = JSON.parse(request.responseText);
        console.log(checkout_array);
        var checkoutID = checkout_array[0]._id;
        sessionStorage.setItem('checkoutID', checkoutID);
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

function payForProduct() {

    var cardNumber = document.getElementById('cardNumber').value;
    var expiryDate = document.getElementById('expiryDate').value;
    var cvv = document.getElementById('cvv').value;
    var nameOnCard = document.getElementById('nameOnCard').value;


    if (cardNumber == "" || expiryDate == "" || cvv == "" || nameOnCard == "") {
        alert('Missing Fields!')
    } else {

        var checkoutID = sessionStorage.getItem('checkoutID');

        // Perform Visa card validation checks
        var isVisaCard = /^4\d{3}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(cardNumber); // Check if the card number starts with "4" and has spaces after every 4 digits.
        var isExpiryDateValid = /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiryDate); // Check if the expiry date matches the format "MM/YY".
        var isCvvValid = /^[0-9]{3}$/.test(cvv); // Check if the CVV is a 3-digit number.

        if (!isVisaCard) {
            alert('Invalid Visa Card Number!');
        } else if (!isExpiryDateValid) {
            alert('Invalid Expiry Date!');
        } else if (!isCvvValid) {
            alert('Invalid CVV!');
        } else {
            // If all checks pass, proceed with the payment
            var request = new XMLHttpRequest();

            request.open('POST', 'https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/payment', true);
            request.onload = function () {
                alert('Order Placed! Thank You!')
                $('#paymentModal').modal('hide');
                sessionStorage.removeItem("checkoutID");
                sessionStorage.removeItem("cartID");
                sessionStorage.removeItem("cartTotalPrice");
                window.location.href = 'index.html'
            }

            request.send(JSON.stringify({ card_number: cardNumber, expiry_date: expiryDate, cvv: cvv, name_on_card: nameOnCard, checkoutID: checkoutID }));
        }


    }
}