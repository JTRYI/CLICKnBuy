
function getProducts() {
    var request = new XMLHttpRequest();

    request.open('GET', 'https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com//products', true);

    //This function will be called when data returns from the web api    
    request.onload = function () {
        //get all the product records into our product array        
        products_array = JSON.parse(request.responseText);
        sessionStorage.setItem("products", JSON.stringify(products_array));
        console.log(products_array) // output to console
        displayProducts(category);    

    };

    //This command starts the calling of the products web api    
    request.send();
}

function displayProducts(category) {

    var table = document.getElementById('productsTable')
    table.innerHTML = '';
    totalProducts = products_array.length;

    for (var count = 0; count < totalProducts; count++) {
        if (category == '') {
            var thumbnail = products_array[count].product_img;
            var title = products_array[count].product_title;
            var price = products_array[count].product_price;
            var avgRating = products_array[count].avgRating;
            avgRating = Math.round(avgRating * 10) / 10;;
            if (avgRating == 0) {
                avgRating = "NA (No Reviews Yet)"
            }
            var cell = '<div class="card card-product" style = "max-width: 325px;">\
            <img src="'+ thumbnail +'" class="card-img-top" alt="...">\
            <div class="card-body">\
              <h5 class="card-title">'+ title +'</h5>\
              <div class = "ratings-section"><label class = "view-ratings">Rating:</label> <span class = "avg-rating">'+ avgRating + ' </span> <i class="fa-solid fa-star custom-front-star"></i> </div>\
              <p class="card-text" style = "color: #30d5c8">$'+ price +'</p>\
            </div>\
          </div>'
            table.insertAdjacentHTML('beforeend', cell);
        } else {

            if (products_array[count].product_type == category) {
                var thumbnail = products_array[count].product_img;
                var title = products_array[count].product_title;
                var price = products_array[count].product_price;
                var avgRating = products_array[count].avgRating;
                avgRating = Math.round(avgRating * 10) / 10;;
                if (avgRating == 0) {
                    avgRating = "NA (No Reviews Yet)"
                }
                var cell = '<div class="card card-product" style = "max-width: 325px;" >\
                <img src="'+ thumbnail +'" class="card-img-top" alt="...">\
                <div class="card-body">\
                  <h5 class="card-title">'+ title +'</h5>\
                  <div class = "ratings-section"><label class = "view-ratings">Rating:</label> <span class = "avg-rating">'+ avgRating + ' </span> <i class="fa-solid fa-star custom-front-star"></i> </div>\
                  <p class="card-text" style = "color: #30d5c8">$'+ price +'</p>\
                </div>\
              </div>'
                table.insertAdjacentHTML('beforeend', cell);

            }
        }

    }
}

// Search function
document.getElementById("searchInput").addEventListener("input", function (event) {
    event.preventDefault();
    var input = document.getElementById("searchInput").value.toLowerCase();
    console.log(input);
    var table = document.getElementById("productsTable");
    table.innerHTML = "";

    for (var count = 0; count < products_array.length; count++) {
        var title = products_array[count].product_title.toLowerCase();
        if (title.includes(input)) {
            var thumbnail = products_array[count].product_img;
            var title = products_array[count].product_title;
            var price = products_array[count].product_price;
            var avgRating = products_array[count].avgRating;
            avgRating = Math.round(avgRating * 10) / 10;;
            if (avgRating == 0) {
                avgRating = "NA (No Reviews Yet)"
            }
            var cell = '<div class="card card-product" style = "max-width: 325px;">\
            <img src="'+ thumbnail +'" class="card-img-top" alt="...">\
            <div class="card-body">\
              <h5 class="card-title">'+ title +'</h5>\
              <div class = "ratings-section"><label class = "view-ratings">Rating:</label> <span class = "avg-rating">'+ avgRating + ' </span> <i class="fa-solid fa-star custom-front-star"></i> </div>\
              <p class="card-text" style = "color: #30d5c8">$'+ price +'</p>\
            </div>\
          </div>'
            table.insertAdjacentHTML('beforeend', cell);
        }
    }
});

function listAllProducts() {
    category = '';
    displayProducts(category);
}

function listGamingProducts() {
    category = "Gaming";
    displayProducts(category);
}

function listMenFashionProducts() {

    category = "Men's Fashion";
    displayProducts(category);
}

function listWomenFashionProducts() {

    category = "Women's Fashion";
    displayProducts(category);

}

function listKidsFashionProducts() {

    category = "Kid's Fashion";
    displayProducts(category);

}

function listMobileGadgetsProducts() {

    category = "Mobile & Gadgets";
    displayProducts(category);

}

function listWatchProducts() {

    category = "Watches"
    displayProducts(category);

}

function listMenShoesProducts() {

    category = "Men's Shoe";
    displayProducts(category);

}

function listWomenShoesProducts() {

    category = "Women's Shoe";
    displayProducts(category);

}

function listTravelProducts() {

    category = "Travel";
    displayProducts(category);

}