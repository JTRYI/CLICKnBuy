function getReviews() {
    var request = new XMLHttpRequest();

    request.open('GET', 'https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/reviews', true);

    request.onload = function () {
        //get all the reviews records into our reviews array
        review_array = JSON.parse(request.responseText);
        sessionStorage.setItem("reviews", JSON.stringify(review_array));
        console.log(review_array);

        // Now that reviews are fetched, call the function to display product reviews
        const productID = getQueryParam('id');
        displayProductReviews(productID);
        getCart();
    }

    request.send();
}

function displayProductReviews(productID) {

    document.getElementById("reviewBody").textContent = "";

    for (var i = 0; i < review_array.length; i++) {
        if (review_array[i].productID == productID) {

            star = "";
            var html = '<div class="text-left">                                                           \
                      <div class="card review-card" style = "border: none">                                                                                  \
                          <div class="card-body">                                                                         \
                              <p class="card-text" id="rating' + i + '">' + review_array[i].review + "</p>               \
                              <small>by " + review_array[i].username + " @ " + review_array[i].timestamp + "</small>   \
                          </div>                                                                                          \
                      </div>                                                                                              \
                  </div>";
            document.getElementById("reviewBody").insertAdjacentHTML('beforeend', html);

            var star = "";
            for (var j = 0; j < review_array[i].review_rating; j++) {
                //   console.log(i);
                star += "<img class ='rating-star' src='images/coloured-star.png' style='width:30px' />";
            }
            star += "<i class='far fa-edit fa-1x edit custom-edit' id = 'editRevIcon" + review_array[i]._id + "'data-bs-toggle='modal' data-bs-target='#editReviewModal' item='" + i + "' onClick='editReview(this)' style ='color: #30d5c8; cursor:pointer'></i>";
            star += "<i class='far fa-trash-alt fa-1x edit custom-bin' id = 'delRevIcon" + review_array[i]._id + "' data-dismiss='modal' item='" + i + "' onClick='deleteReview(this)' style = 'color: #ff0000; cursor:pointer' ></i>";
            document.getElementById("rating" + i).insertAdjacentHTML('beforebegin', star + "<br/>");

            var token = sessionStorage.getItem("token");
            if (token == null) {
                document.getElementById("delRevIcon" + review_array[i]._id).style.visibility = "hidden";
                document.getElementById("editRevIcon" + review_array[i]._id).style.visibility = "hidden";
            } else {
                var profile = JSON.parse(sessionStorage.getItem("profile"));
                var userID = profile[0]._id;
                if (userID == review_array[i].userID) {
                    document.getElementById("delRevIcon" + review_array[i]._id).style.visibility = "visible";
                    document.getElementById("editRevIcon" + review_array[i]._id).style.visibility = "visible";
                } else {
                    document.getElementById("delRevIcon" + review_array[i]._id).style.visibility = "hidden";
                    document.getElementById("editRevIcon" + review_array[i]._id).style.visibility = "hidden";
                }
            }

        }

    }
}

function newReview() {

    //Initialise each HTML input elements in the modal window with default value.
    var backButton = document.querySelector(".reviews-plus");
    var token = sessionStorage.getItem("token");
    var profile = JSON.parse(sessionStorage.getItem("profile"))


    if (token != null) {
        username = profile[0].username
        rating = 0;
        document.getElementById("addReviewUsername").value = username;
        document.getElementById("userReview").value = "";

        backButton.setAttribute("data-bs-toggle", "modal");
        backButton.setAttribute("data-bs-target", "#addReviewModal");
    }

    else {
        alert("Please login to add reviews!")

    }

}

//This function allows the user to mouse hover the black and white star
//so that it will turn to a colored version when hovered
function rateIt(element) {
    var num = element.getAttribute("value");
    var classname = element.getAttribute("class");
    var stars = document.getElementsByClassName(classname);
    var classTarget = "." + classname;

    // This is another way of writing 'for' loop, which initialises the 
    // star images to use black and white.
    for (let star of stars) {
        star.setAttribute("src", starBWImage);
    }
    changeStarImage(num, classTarget);
}

// This function sets the rating and coloured images based on the value of the image tag when  
// the mouse cursor hovers over the star image.
function changeStarImage(num, classTarget) {
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            rating = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            rating = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            rating = 3;
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            rating = 4;
            break;
        case 5:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", starImage);
            rating = 5;
            break;
    }
}


//This function displays the correct number of colored star
//based on the restaurant rating that is given in the user comment
function displayColorStar(classname, num) {
    var pop = document.getElementsByClassName(classname);
    var classTarget = "." + classname;
    for (let p of pop) {
        p.setAttribute("src", starBWImage);
    }
    changeStarImage(num, classTarget);
}

// Submit or send the new review to the server to be added.
function addReview() {

    var token = sessionStorage.getItem('token');
    productID = getQueryParam('id');

    var review = new Object();

    review.username = document.getElementById("addReviewUsername").value; // Value from HTML input text
    review.review = document.getElementById("userReview").value; // Value from HTML input text
    review.review_rating = rating;
    review.token = token;
    review.productID = productID;

    if (review.review == '') {
        alert('Please enter a review.')
    } else {

        var postReview = new XMLHttpRequest(); // new HttpRequest instance to send comment

        postReview.open('POST', 'https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/reviews/add', true); //Use the HTTP POST method to send data to server

        postReview.onload = function () {
            // console.log('New Review Sent')
            location.reload();

        };

        postReview.send(JSON.stringify(review));

    }
}

function editReview(element) {

    var item = element.getAttribute("item");
    currentIndex = item;

    document.getElementById("editReviewUsername").value = review_array[item].username;
    document.getElementById("editUserReview").value = review_array[item].review;
    console.log(review_array[item].review_rating);
    displayColorStar('editpop', review_array[item].review_rating);

}

//This function sends the review data to the server for updating
function updateReview() {
    var response = confirm("Are you sure you want to update this review?");
    if (response == true) {

       
        reviewID = review_array[currentIndex]._id;

        var updateReview = new XMLHttpRequest(); // new HttpRequest instance to send request to server

        updateReview.open('PUT', 'https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/reviews/update/' + reviewID, true); //The HTTP method called 'PUT' is used here as we are updating data
       
        review_array[currentIndex].review_rating = rating;
        updateReview.onload = function () {
            
            location.reload()
        };

        updateReview.send(JSON.stringify({
            review: document.getElementById('editUserReview').value,
            review_rating: rating,
            token: sessionStorage.getItem("token")

        }));
    }
}

function deleteReview(element) {
    var response = confirm("Are you sure you want to delete this comment?");

    if (response == true) {
        var item = element.getAttribute("item"); //get the current item
        reviewID = review_array[item]._id;

        var eraseReview = new XMLHttpRequest();
        eraseReview.open("DELETE", 'https://wpm1w6eh5j.execute-api.us-east-1.amazonaws.com/reviews/delete/' + reviewID, true);
        
        eraseReview.onload = function () {
            
            location.reload()
        };

        eraseReview.send(JSON.stringify({
            token: sessionStorage.getItem("token")
        }));
    }
}
