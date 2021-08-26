let circle = document.getElementsByClassName("circle");
let slide1 = document.getElementsByClassName("slide")[0];
let slide2 = document.getElementsByClassName("slide")[1];
let slide3 = document.getElementsByClassName("slide")[2];
let counter = 0;

function animate() {
    if (counter == 0) {
        slide1.style.left = "20%";
        slide2.style.left = "50%";
        slide3.style.left = "80%";
        slide1.style.opacity = 0;
        slide3.style.opacity = 0;
        slide2.style.opacity = 1;
        slide1.classList.add("position1");
        slide1.classList.remove("position2", "position3");
        slide2.classList.add("position2", "active");
        slide2.classList.remove("position1", "position3");
        slide3.classList.add("position3");
        slide3.classList.remove("position2", "position1", "active");
        circle[counter].style.backgroundColor = "black";
        circle[counter + 1].style.backgroundColor = "white";
        circle[counter + 2].style.backgroundColor = "white";
        counter++;
    }
    else if (counter == 1) {
        slide3.style.left = "20%";
        slide1.style.left = "50%";
        slide2.style.left = "80%";
        slide2.style.opacity = 0;
        slide3.style.opacity = 0;
        slide1.style.opacity = 1;
        slide2.classList.add("position3");
        slide2.classList.remove("position2", "position1", "active");
        slide3.classList.add("position1");
        slide3.classList.remove("position2", "position3", 'active');
        slide1.classList.add("position2", "active");
        slide1.classList.remove("position1", "position3");
        circle[counter].style.backgroundColor = "black";
        circle[counter + 1].style.backgroundColor = "white";
        circle[counter - 1].style.backgroundColor = "white";
        counter++;
    }
    else {
        slide2.style.left = "20%";
        slide3.style.left = "50%";
        slide1.style.left = "80%";
        slide1.style.opacity = 0;
        slide2.style.opacity = 0;
        slide3.style.opacity = 1;
        slide2.classList.add("position1");
        slide2.classList.remove("position2", "position3", "active");
        slide3.classList.add("position2", "active");
        slide3.classList.remove("position1", "position3");
        slide1.classList.add("position3");
        slide1.classList.remove("position1", "position2", "active");
        circle[counter].style.backgroundColor = "black";
        circle[counter - 1].style.backgroundColor = "white";
        circle[counter - 2].style.backgroundColor = "white";
        counter = 0;
    }
    window.setTimeout(animate, 6000);
}

animate();