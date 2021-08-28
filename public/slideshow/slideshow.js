let circle = document.getElementsByClassName("circle");
let slide = document.getElementsByClassName("slide");
let counter = 0;

function animate() {
    if (counter == 0) {
        for (let i = 0; i < slide.length; i++) {
            if (i == 0) {
                slide[i].style.zIndex = "5";
                slide[i + 1].style.zIndex = "0";
                slide[i + 2].style.zIndex = "0";
                slide[i].classList.add("active");
            }
            slide[i].classList.remove("active");
        }
        circle[counter].style.backgroundColor = "black";
        circle[counter + 1].style.backgroundColor = "white";
        circle[counter + 2].style.backgroundColor = "white";
        counter++;
    }
    else if (counter == 1) {
        for (let i = 0; i < slide.length; i++) {
            if (i == 1) {
                slide[i].style.zIndex = "5";
                slide[i + 1].style.zIndex = "0";
                slide[i - 1].style.zIndex = "0";
                slide[i].classList.add("active");
            }
            slide[i].classList.remove("active");

        }
        circle[counter].style.backgroundColor = "black";
        circle[counter + 1].style.backgroundColor = "white";
        circle[counter - 1].style.backgroundColor = "white";
        counter++;
    }
    else {
        for (let i = 0; i < slide.length; i++) {
            if (i == 2) {
                slide[i].style.zIndex = "5";
                slide[i - 1].style.zIndex = "0";
                slide[i - 2].style.zIndex = "0";
                slide[i].classList.add("active");
            }
            slide[i].classList.remove("active");

        }
        circle[counter].style.backgroundColor = "black";
        circle[counter - 1].style.backgroundColor = "white";
        circle[counter - 2].style.backgroundColor = "white";
        counter = 0;
    }
    window.setTimeout(animate, 6000);
}

animate.call(window);