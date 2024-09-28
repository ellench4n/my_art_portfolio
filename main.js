var gallery = document.querySelector('.gallery');
var imgItems = document.querySelectorAll('.image-item');
var slideIndex = 1;

// displays enlarged image on top of gallery
function showSlides(n){
    var expandImg = document.getElementById("expandedImg"); 
    expandImg.src = imgItems[slideIndex].firstElementChild.src;
    expandImg.parentElement.style.display = "flex";
}

// finds and enlarges inputted item
function expand(imgItem){
    for (let i = 0; i < imgItems.length; i++){
        // find slide index
        if (imgItems[i] == imgItem){
            console.log(i);
            slideIndex = i;
            // check index bounds
            if (slideIndex > imgItems.length-1){ // go to first image
                slideIndex = 0;
            }
            if (slideIndex < 0){ // go to last image
                slideIndex = imgItems.length-1;
            }
            showSlides(slideIndex);
            break;
        }
    }
    disableScroll();
}

// closes enlarged image
function closeGallery(closeButton){
    closeButton.parentElement.parentElement.style.display = 'none';
    console.log('close'); 
    enableScroll();
}

// goes to previous or next image based on input
function changeSlides(n){
    slideIndex += n;
    for (let i=0; i < imgItems.length; i++){
        // check index bounds
        if (slideIndex > imgItems.length-1){ // go to first image
            slideIndex = 0;
        }
        if (slideIndex < 0){ // go to last image
            slideIndex = imgItems.length-1;
        }
        console.log(slideIndex);
        console.log(imgItems[slideIndex]); 
        // check if img should be shown
        if (imgItems[slideIndex].classList.contains('show')){
            showSlides(slideIndex);
            break;
        } else {
            slideIndex += n;
        }
    }
}

function disableScroll(){
    scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop;
    scrollLeft =
        window.pageXOffset ||
        document.documentElement.scrollLeft;

    // if any scroll is attempted,
    // set this to the previous value
    window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

function enableScroll(){
    window.onscroll = function () { };
}

/* Opens or closes menu buttons in mobile view */
function showNavBar(){
    var navbar = document.querySelector('.navbar');

    if (navbar.className === "navbar"){
        navbar.className += " responsive";
    } else {
        navbar.className = "navbar";
    }
}


/* Opens/closes filter buttons*/
function showFilters(){
    var filters = document.querySelector('.filters');

    if (filters.className === "filters"){
        filters.className += " show";
    } else {
        filters.className = "filters";
    }
}

/* show all images in gallery (default) */
function showAllImages(){
    if (gallery.className == "gallery"){
        // show all images with class 'show'
        for (let i=0; i < imgItems.length; i++){
            imgItems[i].classList.add("show");
        }
    }
}
if (window.location.pathname === '/gallery.html') {
    showAllImages();
}

/* show images of given category */
function showCategory(cat){
    var button = document.querySelector(`.button.${cat}`);

    if (!gallery.classList.contains(cat)){
        gallery.classList.add(cat); // indicate category is picked
        button.classList.add("picked");

        if (gallery.className == "gallery"){ // no other filters are applied
            // hide all non-category
            for (let i=0; i < imgItems.length; i++){
                if (imgItems[i].classList.contains(cat)){
                    imgItems[i].classList.add("showThis");
                } else {
                    imgItems[i].classList.remove("show");
                }
                console.log(imgItems[i]); 
            }
        } else { // other filters have been applied
            for (let i=0; i < imgItems.length; i++){
                if (imgItems[i].classList.contains(cat)){
                    imgItems[i].classList.add("showThis");
                    imgItems[i].classList.add("show");
                } else if (!imgItems[i].classList.contains("showThis")){
                    imgItems[i].classList.remove("show");
                }
                console.log(imgItems[i]); 
            }
        }
    } else {
        gallery.classList.remove(cat);
        button.classList.remove("picked");
        
        if (gallery.className == "gallery"){ // no other filters are applied
            // show all
            for (let i=0; i < imgItems.length; i++){
                if (imgItems[i].classList.contains(cat)){
                    imgItems[i].classList.remove("showThis");
                } else if (!imgItems[i].classList.contains("showThis")){
                    imgItems[i].classList.add("show");
                }
                console.log(imgItems[i]);
            }
        } else { // other filters still are applied
            // only hide category
            for (let i=0; i < imgItems.length; i++){
                if (imgItems[i].classList.contains(cat)){
                    imgItems[i].classList.remove("show");
                    imgItems[i].classList.remove("showThis");
                    console.log(imgItems[i]);
                }
            }
        }
    }
}