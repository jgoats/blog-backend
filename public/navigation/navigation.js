let dropdown = document.getElementsByClassName("content-container")[0];
var navCounter = 0;


document.getElementById("nav-dropdown").addEventListener("click", function () {
    if (navCounter == 0) {
        moveDown.call(window);
    }
    else {
        moveUp.call(window);
    }

}, false);


function moveDown() {
    dropdown.classList.add("content-container-active");
    dropdown.classList.remove("content-container");
    navCounter++;
}
function moveUp() {
    console.log("ran moveup");
    dropdown.classList.add("content-container");
    dropdown.classList.remove("content-container-active");
    navCounter--;
}