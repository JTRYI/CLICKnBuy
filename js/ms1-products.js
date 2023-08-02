
function getProducts() {
    var request = new XMLHttpRequest();

    request.open('GET', 'https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/products', true);

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
            <img src="'+ thumbnail + '" class="card-img-top" alt="...">\
            <div class="card-body" style="cursor:pointer" item="' + count + '" onClick="showProductDetails(this)" >\
              <h5 class="card-title" style = " min-height: 70px; font-size: 15px;">'+ title + '</h5>\
              <div class = "ratings-section"><label class = "view-ratings">Rating:</label> <span class = "avg-rating">'+ avgRating + ' </span> <i class="fa-solid fa-star custom-front-star"></i> </div>\
              <p class="card-text" style = "color: #30d5c8">$'+ price + '</p>\
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
                var cell = '<div class="card card-product" style = "max-width: 325px;">\
                <img src="'+ thumbnail + '" class="card-img-top" alt="...">\
                <div class="card-body" style="cursor:pointer" item="' + count + '" onClick="showProductDetails(this)" >\
                  <h5 class="card-title" style = " min-height: 70px; font-size: 15px;">'+ title + '</h5>\
                  <div class = "ratings-section"><label class = "view-ratings">Rating:</label> <span class = "avg-rating">'+ avgRating + ' </span> <i class="fa-solid fa-star custom-front-star"></i> </div>\
                  <p class="card-text" style = "color: #30d5c8">$'+ price + '</p>\
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
            <img src="'+ thumbnail + '" class="card-img-top" alt="...">\
            <div class="card-body" style="cursor:pointer" item="' + count + '" onClick="showProductDetails(this)" >\
              <h5 class="card-title" style = " min-height: 70px; font-size: 15px;">'+ title + '</h5>\
              <div class = "ratings-section"><label class = "view-ratings">Rating:</label> <span class = "avg-rating">'+ avgRating + ' </span> <i class="fa-solid fa-star custom-front-star"></i> </div>\
              <p class="card-text" style = "color: #30d5c8">$'+ price + '</p>\
            </div>\
          </div>'
            table.insertAdjacentHTML('beforeend', cell);
        }
    }
});

function listAllProducts() {
    category = '';
    displayProducts(category);
    resetNavColors();
    const allCategories = document.getElementById('allCategories');
    allCategories.style.color = "#30d5c8";
    
}

function listGamingProducts() {
    category = "Gaming";
    displayProducts(category);
    resetNavColors();
    const gamingProducts = document.getElementById('gamingProducts');
    gamingProducts.style.color = "#30d5c8";
    
}

function listMenFashionProducts() {

    category = "Men's Fashion";
    displayProducts(category);
    resetNavColors();
    const mensFashion = document.getElementById('mensFashionProducts');
    mensFashion.style.color = "#30d5c8";
}

function listWomenFashionProducts() {

    category = "Women's Fashion";
    displayProducts(category);
    resetNavColors();
    const womensFashion = document.getElementById('womensFashionProducts');
    womensFashion.style.color = "#30d5c8";

}

function listKidsFashionProducts() {

    category = "Kid's Fashion";
    displayProducts(category);
    resetNavColors();
    const kidsFashion = document.getElementById('kidsFashionProducts');
    kidsFashion.style.color = "#30d5c8";

}

function listMobileGadgetsProducts() {

    category = "Mobile & Gadgets";
    displayProducts(category);
    resetNavColors();
    const mobileProducts = document.getElementById('mobileProducts');
    mobileProducts.style.color = "#30d5c8";

}

function listWatchProducts() {

    category = "Watches"
    displayProducts(category);
    resetNavColors();
    const watchProducts = document.getElementById('watchProducts');
    watchProducts.style.color = "#30d5c8";

}

function listMenShoesProducts() {

    category = "Men's Shoes";
    displayProducts(category);
    resetNavColors();
    const mensShoes = document.getElementById('mensShoesProducts');
    mensShoes.style.color = "#30d5c8";

}

function listWomenShoesProducts() {

    category = "Women's Shoes";
    displayProducts(category);
    resetNavColors();
    const womensShoes = document.getElementById('womensShoesProducts');
    womensShoes.style.color = "#30d5c8";

}

function listTravelProducts() {

    category = "Travel";
    displayProducts(category);
    resetNavColors();
    const travelProducts = document.getElementById('travelProducts');
    travelProducts.style.color = "#30d5c8";

}

function resetNavColors() {
    const navItems = document.getElementsByClassName('nav-link');
    for (let i = 0; i < navItems.length; i++) {
        navItems[i].style.color = "black";
    }
}

function goToPageWithProductID(id) {
    // Construct the URL with the query parameter "id"
    const url = 'product.html?id=' + encodeURIComponent(id);
  
    // Navigate to the target page
    window.location.href = url;
  }


function showProductDetails(element){
    var item = element.getAttribute('item');
    currentIndex = item;
    console.log("Product details:", products_array[item])

    // Use the item index to get the product ID
    var productID = products_array[item]._id;

    // Pass the product ID to the goToPageWithProductID function
    goToPageWithProductID(productID);
}