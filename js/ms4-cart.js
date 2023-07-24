
function goToCart() {

    var token = sessionStorage.getItem('token');

    if (token != null) {
        window.location.href = 'shopping-cart.html'
    } else {
        alert('Please login to access shopping cart!')
    }
}

function getCart() {

    var token = sessionStorage.getItem('token')

    var cartRequest = new XMLHttpRequest();

    cartRequest.open('GET', 'https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/check/cart/' + token, true);

    cartRequest.onload = function () {

        var response = JSON.parse(cartRequest.responseText);
        // console.log(response);

        // Check if the response contains the message "No Cart Available"
        if (response.message == "No Cart Available") {
            // If "No Cart Available" is found, proceed to create the cart
            createCart();
        }

        // Cart found, store the cartID in the session storage
        const cartID = response.cartID;
        console.log("cartID", cartID);
        sessionStorage.setItem('cartID', cartID);

        getCartItems();
        getCartTotalPrice();

    }

    cartRequest.send();
}

function createCart() {

    var cartCreateRequest = new XMLHttpRequest();

    cartCreateRequest.open('POST', 'https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/cart/create', true);

    cartCreateRequest.onload = function () {
        var response = cartCreateRequest.responseText;
        console.log(response);
        location.reload();

    }

    cartCreateRequest.send(JSON.stringify({ token: sessionStorage.getItem('token') }));
}

function getCartItems() {

    var token = sessionStorage.getItem('token');

    var request = new XMLHttpRequest();

    request.open('GET', 'https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/cart/' + token, true)

    request.onload = function () {

        cart_array = JSON.parse(request.responseText);
        console.log(cart_array);
        // sessionStorage.setItem('cartitems', JSON.stringify(cart_array));

        displayCartItems();

    }

    request.send();
}

function displayCartItems() {

    document.getElementById('cartBody').textContent = "";

    for (var i = 0; i < cart_array.length; i++) {

        var totalPriceProduct = cart_array[i].total_price_product;
        totalPriceProduct = parseFloat(totalPriceProduct).toFixed(2);

        var html = `
        <div class="cart-items-block">
            <div class="cart-item-img-box">
                <img src="${cart_array[i].product_img}" alt="">
            </div>
            <h4 class="item-title">${cart_array[i].product_title}</h4>
            <div class="cart-items-together">
                <h5 class="item-price" style="padding-right: 10px;">$${cart_array[i].product_price}</h5>
                <div class="quantity-counter">
                    <button class="decrease-button" item="${i}" onclick="decreaseQuantity(this)">-</button>
                    <input class="quantity-input" type="number" id = "quantityInput${i}" value="${cart_array[i].quantity}" min="1" max="${cart_array[i].product_quantity}">
                    <button class="increase-button" item="${i}" onclick="increaseQuantity(this)">+</button>
                </div>
                <h5 class="total-item-price" style="padding-right: 22px; color:#30d5c8">$${totalPriceProduct}</h5>
                <h5 class="custom-item-bin"><i class="fa-solid fa-trash-can" style="color: red; cursor:pointer" item="${i}" onClick='removeFromCart(this)'></i></h5>
            </div>
        </div>`;
        document.getElementById("cartBody").insertAdjacentHTML('beforeend', html);

    }
}

// For Quantity counter
function increaseQuantity(element) {

    var item = element.getAttribute("item");
    // console.log(item);
    currentIndex = item;

    var inputElement = document.getElementById("quantityInput" + currentIndex);
    // console.log("Input element value",inputElement);
    // (+) to convert the value to an integer.
    var currentQuantity = +inputElement.value;
    var maxQuantity = +inputElement.getAttribute('max');

    cartItemID = cart_array[currentIndex]._id;
    // console.log("cartitem id is ", cartItemID);
    productID = cart_array[currentIndex].productID;

    if (currentQuantity < maxQuantity) {
        inputElement.value = currentQuantity + 1;

        var currentQuantity = +inputElement.value;

        var request = new XMLHttpRequest();

        request.open('PUT', 'https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/cartitem/quantity/' + cartItemID, true);

        request.onload = function () {

            var response = JSON.parse(request.responseText);
            console.log(response);
            location.reload();


        }

        request.send(JSON.stringify({ quantity: currentQuantity, productID: productID }));
    }

}

function decreaseQuantity(element) {
    var item = element.getAttribute("item");
    // console.log(item);
    currentIndex = item;

    var inputElement = document.getElementById("quantityInput" + currentIndex);
    // console.log("Input element value",inputElement);
    // (+) to convert the value to an integer.
    var currentQuantity = +inputElement.value;
    var minQuantity = +inputElement.getAttribute('min');

    cartItemID = cart_array[currentIndex]._id;
    // console.log("cartitem id is ", cartItemID);
    productID = cart_array[currentIndex].productID;

    if (currentQuantity > minQuantity) {
        inputElement.value = currentQuantity - 1;
        var currentQuantity = +inputElement.value;

        var request = new XMLHttpRequest();

        request.open('PUT', 'https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/cartitem/quantity/' + cartItemID, true);

        request.onload = function () {

            var response = JSON.parse(request.responseText);
            console.log(response);
            location.reload();


        }

        request.send(JSON.stringify({ quantity: currentQuantity, productID: productID }));
    }

}

function getCartTotalPrice() {

    cartID = sessionStorage.getItem('cartID');

    var request = new XMLHttpRequest();

    request.open('GET', 'https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/cart/total-price/' + cartID, true);
    request.onload = function () {

        var response = JSON.parse(request.responseText);
        var totalPrice = response[0].total_price;
        // console.log(totalPrice);
        sessionStorage.setItem('cartTotalPrice', totalPrice);
        displayCartTotalPrice();
    }

    request.send();
}

function displayCartTotalPrice() {

    var totalPrice = sessionStorage.getItem('cartTotalPrice');
    totalPrice = parseFloat(totalPrice).toFixed(2);
    console.log('Cart Total Price', totalPrice);

    if (totalPrice == null || totalPrice === "NaN") {
        document.getElementById('cartTotalPrice').textContent = '$0'
    } else {
        document.getElementById('cartTotalPrice').textContent = '$' + totalPrice
    }

}

function addToCart() {

    var token = sessionStorage.getItem('token');
    var product = JSON.parse(sessionStorage.getItem('clickedProduct'));

    if (token != null) {

        var confirmation = confirm("Add item to cart?");
        if (confirmation == true) {
            quantity = 1;
            var totalPriceProduct = product.product_price;
            cartID = sessionStorage.getItem('cartID');
            productID = product._id;

            var request = new XMLHttpRequest();

            request.open('POST', 'https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/cartitem/add', true);
            request.onload = function () {
                var response = request.responseText;
                //console.log("Add to cart request", response);
                alert('Item added to cart.')

            }

            request.send(JSON.stringify({ quantity: quantity, total_price_product: totalPriceProduct, cartID: cartID, productID: productID }));
        }
    } else {
        alert('Please login to access this feature!')
    }

}


function removeFromCart(element) {
    var confirmation = confirm('Remove from cart?');
    if (confirmation == true) {

        var item = element.getAttribute("item"); //get the current item
        cartItemID = cart_array[item]._id;

        var request = new XMLHttpRequest();

        request.open('DELETE', 'https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/cartitem/' + cartItemID, true);
        request.onload = function () {
            var response = request.responseText;
            //console.log("Add to cart request", response);
            location.reload();
        }

        request.send();

    }
}
