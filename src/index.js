const pizzaDotStyle = {
    target: "bg-emphasize",
    secondary: "bg-main",
    normal: "bg-second"
}
const mobile_icon = document.getElementById("mobile-icon");
const mobile_menu = document.getElementById("mobile-menu");
const hamburgers = document.querySelectorAll("#mobile-icon .button-hamburger div");
const navBar = document.querySelector("nav");
const sections = document.querySelectorAll("section.section_item");
const navLi = document.querySelectorAll("nav .container ul li");
const compoundList = document.querySelector("#compound .slick-container .item-list");
const pizzaBox = document.querySelector("#product-show .product-box");
const pizzaNumber = document.querySelector("#product-show .now");
const pizzaDots = document.querySelectorAll("#product-show .deco-dot li");

let lastIpdateCompoundItem;
function next() {
    compoundList.scrollLeft += document.querySelector("#compound .slick-container .item-list .item").clientWidth;

    if (lastIpdateCompoundItem) {
        clearTimeout(lastIpdateCompoundItem);
    }

    setTimeout(() => {
        compoundList.append(compoundList.children[0]);
    }, 400);

    // or gsap
}

function previous() {
    compoundList.scrollLeft -= document.querySelector("#compound .slick-container .item-list .item").clientWidth;

    if (lastIpdateCompoundItem) {
        clearTimeout(lastIpdateCompoundItem);
    }

    setTimeout(() => {
        compoundList.prepend(compoundList.children[compoundList.children.length - 1]);
    }, 400);

    // or gsap
}

function setPizzaDot(index) {
    pizzaDots[index].classList.add(pizzaDotStyle.target);

    if (index !== 4) {
        pizzaDots[index + 1].classList.add(pizzaDotStyle.secondary);
    }

    pizzaDots.forEach((item) => {
        if (item.classList.length === 0) {
            item.classList.add(pizzaDotStyle.normal);
        }
    });
}

function setNavStatus() {
    //navBar change color
    if (window.scrollY > 30) {
        navBar.classList.add("scrolled");
        hamburgers.forEach((item) => {
            item.style.background = "#3279ce";
        });
    } else {
        navBar.classList.remove("scrolled");
        hamburgers.forEach((item) => {
            item.style.background = "#FFF";
        });
    }
}

let navIsOpen = false;
let mobileNavTimeLine = gsap.timeline({ paused: true });

//icon animate
mobileNavTimeLine.to(hamburgers[0], {
    transformOrigin: "0% 0%",
    rotation: 45,
    duration: 0.5
}, 0);

mobileNavTimeLine.to(hamburgers[1], {
    xPercent: -200,
    duration: 0.5,
    autoAlpha: 0
}, 0);

mobileNavTimeLine.to(hamburgers[2], {
    transformOrigin: "0% 100%",
    rotation: -45,
    duration: 0.5
}, 0);

//nav extend animate
mobileNavTimeLine.to("nav .after", {
    xPercent: -100,
    duration: 0.8,
    stagger: 0.4,
    ease: "circ.out"
});

//nav item animate
mobileNavTimeLine.to("nav .nav-item", {
    y: -40,
    duration: 0.5,
    stagger: 0.1,
    // ease: "circ.out"
});

let lastHamburgerStyle;
function openNavBar() {
    mobileNavTimeLine.play();
    lastHamburgerStyle = hamburgers[0].style.background;
    hamburgers.forEach((item) => {
        item.style.background = "#FFF";
    });
    navIsOpen = true;
}

function closeNavBar() {
    mobileNavTimeLine.reverse();
    hamburgers.forEach((item) => {
        item.style.background = lastHamburgerStyle;
    });
    navIsOpen = false;
}

mobile_icon.addEventListener("click", () => {
    navIsOpen ? closeNavBar() : openNavBar();
    navIsOpen ? $("body").addClass("overflow-hidden") : $("body").removeClass("overflow-hidden");
});

mobile_menu.querySelectorAll("ul li a").forEach((item) => {
    item.addEventListener("click", (e) => {
        closeNavBar();
        navIsOpen ? $("body").addClass("overflow-hidden") : $("body").removeClass("overflow-hidden");

        if (item.innerHTML.toLowerCase() === "home") {
            return;
        }

        // let target = document.getElementById(e.target.innerHTML.toLowerCase());
        // window.scrollTo({
        //     top: target.offsetTop - document.querySelector("nav").clientHeight,
        //     behavior: "smooth"
        // });
    });
});

gsap.to("#products .parallax-refactor .image", {
    yPercent: -80,
    scrollTrigger: {
        trigger: "#products .parallax-refactor",
        scrub: true
    }
});

let now = 0;
pizzaBox.addEventListener("scroll", (e) => {
    let single = 0;
    let index = 0;

    single = (e.target.scrollWidth / 5) - 10;
    index = Math.trunc(e.target.scrollLeft / single);
    console.log(`total: ${e.target.scrollWidth}, scrollTop: ${e.target.scrollLeft}, single: ${single}, index: ${index}`);

    now = index + 1;

    if (Number(pizzaNumber.innerHTML) !== now) {
        pizzaNumber.innerHTML = "0" + now.toFixed();
        pizzaDots.forEach((item) => {
            item.setAttribute("class", "");
        });

        setPizzaDot(index);
    }
});

// document.querySelector("#product-show").addEventListener("wheel", (e) => {
//     console.log(e.deltaY);

//     if (e.deltaY > 0) {
//         // console.log(`before: scrollLeft: ${pizzaBox.scrollLeft}, single: ${$("#product-show .product-box .product:first").height()}`);
//         pizzaBox.scrollLeft += pizzaBox.querySelector(".product").clientWidth;

//         if (now !== 5) {
//             e.preventDefault();
//         }
//     } else {
//         pizzaBox.scrollLeft -= pizzaBox.querySelector(".product").clientWidth;
//         if (now !== 1) {
//             e.preventDefault();
//         }
//     }

//     console.log(pizzaBox.scrollLeft)
// });

setTimeout(() => {
    $(".loading-animation").fadeOut("slow", () => {
        $("body").removeClass("overflow-hidden");
    });
}, 3000);

document.addEventListener("scroll", () => {
    setNavStatus();

    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - document.querySelector("nav").clientHeight) {
            current = section.getAttribute("id");
        }
    });

    navLi.forEach((li) => {
        li.classList.remove("active");
        if (li.classList.contains(current)) {
            li.classList.add("active");
        }
    });

    // if(current.toLowerCase() === "products"){

    // }
});

document.addEventListener("DOMContentLoaded", (target) => {
    setNavStatus();
});
