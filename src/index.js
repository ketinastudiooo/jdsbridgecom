if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}

const mobile_icon = document.getElementById("mobile-icon");
const mobile_menu = document.getElementById("mobile-menu");
// hamburgers 三條線
const hamburgers = document.querySelectorAll("#mobile-icon .button-hamburger div");

const navBar = document.querySelector("nav");
const sections = document.querySelectorAll("section.section_item");
const navLi = document.querySelectorAll("nav .container ul li");

const compoundList = document.querySelector("#compound .slick-container .item-list");
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
    });
});

// 這個是做視差滾動的
gsap.to("#products .parallax-refactor .image", {
    yPercent: -80,
    scrollTrigger: {
        trigger: "#products .parallax-refactor",
        scrub: true
    }
});

// 進來的overlay 3秒
setTimeout(() => {
    $(".loading-animation").fadeOut("slow", () => {
        $("body").removeClass("overflow-hidden");
    });
}, 1000);

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
});


// Navigation bar change color
document.addEventListener("DOMContentLoaded", (target) => {
    setNavStatus();
});
function setNavStatus() {
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

// horizontal slider
!(function ($) {

    'use strict';

    var isMobile = (window.innerWidth < 1024);

    var $slider = $('.scroll-slider'),
        $slides = $('.scroll-slide'),
        $sliderWrapper = $('.scroll-wrapper'),
        $firstSlide = $slides.first();

    var settings = {},
        slideNum = $slides.length,
        scrollController = null,
        scrollScene = null;

    var scrollDetect = true;
    var slidePos = null;
    var currentSlide = 0;
    var switchTime = 0.5;

    var progressTimeout = null;

    var dotClass = [
        ['bg-emphasize', 'bg-main', 'bg-second', 'bg-second', 'bg-second'],
        ['bg-second', 'bg-emphasize', 'bg-main', 'bg-second', 'bg-second'],
        ['bg-second', 'bg-second', 'bg-emphasize', 'bg-main', 'bg-second'],
        ['bg-second', 'bg-second', 'bg-second', 'bg-emphasize', 'bg-main'],
        ['bg-second', 'bg-second', 'bg-second', 'bg-second', 'bg-main'],
    ];

    // 控制滑鼠滾輪
    var ss = document.querySelector(".scroll-slider")

    // 手機版滑動
    $slides.each(function (index) {
        if (index == 0) {
            $(this).swipe({
                swipeUp: (event) => {
                    console.log("swipeUp at", currentSlide);
                    if (window.scrollY < Math.ceil(scrollScene.triggerPosition())) {
                        console.log("not reach product");
                        scrollController.scrollTo(Math.ceil(scrollScene.triggerPosition()));
                    } else {
                        changeSlide(1);
                    }
                },
                allowPageScroll: "vertical"
            });
        } else if (index == 4) {
            $(this).swipe({
                swipeDown: (event) => {
                    console.log("swipeDown at", currentSlide, window.scrollY, Math.floor(scrollScene.triggerPosition()+scrollScene.duration()));
                    if (window.scrollY > Math.floor(scrollScene.triggerPosition()+scrollScene.duration())) {
                        console.log("not reach product");
                        //scrollController.scrollTo(Math.floor(scrollScene.triggerPosition()+scrollScene.duration())-window.innerHeight);
                        scrollController.scrollTo(Math.ceil(scrollScene.triggerPosition()));
                    } else {
                        changeSlide(3);
                    }
                },
                allowPageScroll: "auto"
            });
        } else {
            $(this).swipe({
                swipeUp: (event) => {
                    console.log("swipeUp at", currentSlide);
                    changeSlide(index+1)
                },
                swipeDown: (event) => {
                    console.log("swipeDown at", currentSlide);
                    changeSlide(currentSlide - 1);
                },
                allowPageScroll: "auto"
            });
        }
    })

    function scrollSlider(options) {
        // Default
        settings = $.extend({
            slider: '.scroll-slider',
            sliderWrapper: '.scroll-wrapper',
            slides: '.scroll-slide',
            slideWidth: null,
            slideHeight: null,
        }, options);

        // Set dimensions
        setDimensions();
    }

    function setDimensions() {
        settings.slideWidth = window.innerWidth;
        settings.slideHeight = window.innerHeight;

        // Set slider width and height
        if (window.innerWidth < 1024) {
            //$slides.css({ "max-height": settings.slideHeight, "min-height": settings.slideHeight, "height": settings.slideHeight });
            $sliderWrapper.height(Math.ceil((settings.slideHeight * $slides.length)));
        } else {
            $sliderWrapper.width(settings.sliderWidth);
        }

        // Set scene
        setScene();
    }

    function setScene() {
        scrollController = new ScrollMagic.Controller();
        createScrollAnimation();


        var slideDuration = (window.innerWidth < 1024) ? 2000 : 500;
        var sceneDuration = slideDuration * 4;
        console.log(sceneDuration);

        slidePos = [
            0,
            slideDuration * 1,
            slideDuration * 2,
            slideDuration * 3,
            slideDuration * 4
        ];

        scrollScene = new ScrollMagic.Scene({
            triggerElement: settings.slider,
            triggerHook: "onLeave",
            duration: sceneDuration
        })
            .setPin(settings.slider)
            .addTo(scrollController)
            .on('progress', function (event) {
                if (window.innerWidth >= 1024) {
                    progressAction(event);
                }
            })


        if (isMobile) {
            scrollScene
                .on('start', function (event) {
                    if (event.scrollDirection == "FORWARD") {
                        console.log("start forward");
                        $slides.first().swipe('option', 'allowPageScroll', 'auto');
                    } else if (event.scrollDirection == "REVERSE") {
                        console.log("start reverse");
                        $slides.first().swipe('option', 'allowPageScroll', 'vertical');
                    }
                })
                .on('end', function (event) {
                    if (event.scrollDirection == "FORWARD") {
                        console.log("end forward");
                        $slides.last().swipe('option', 'allowPageScroll', 'vertical');
                    } else if (event.scrollDirection == "REVERSE") {
                        console.log("end reverse");
                        $slides.last().swipe('option', 'allowPageScroll', 'auto');
                    }
                })
        }


        console.log("triggerPosition =", scrollScene.triggerPosition());
        for (let i = 0; i < 5; i++) {
            slidePos[i] = Math.ceil(scrollScene.triggerPosition()) + slidePos[i];
        }
        slidePos[0] += 10;
        slidePos[4] -= 10;
        console.log(slidePos);
    }

    function progressAction(event) {
        clearTimeout(progressTimeout);
        progressTimeout = setTimeout(() => {
            scrollY = scrollController.scrollPos();
            if (scrollY < slidePos[0]) {
                currentSlide = 0;
                runAnimation(0);
                console.log("anime 0");
            }
            if (scrollY == slidePos[0] && currentSlide != 0) {
                changeSlide(0);
            }
            if (scrollY > slidePos[0] && scrollY < slidePos[1]) {
                if (event.scrollDirection == "FORWARD") {
                    changeSlide(1);
                } else if (event.scrollDirection == "REVERSE") {
                    changeSlide(0)
                }
            }
            if (scrollY == slidePos[1] && currentSlide != 1) changeSlide(1);
            if (scrollY > slidePos[1] && scrollY < slidePos[2]) {
                if (event.scrollDirection == "FORWARD") {
                    changeSlide(2);
                } else if (event.scrollDirection == "REVERSE") {
                    changeSlide(1)
                }
            }
            if (scrollY == slidePos[2] && currentSlide != 2) changeSlide(2);
            if (scrollY > slidePos[2] && scrollY < slidePos[3]) {
                if (event.scrollDirection == "FORWARD") {
                    changeSlide(3);
                } else if (event.scrollDirection == "REVERSE") {
                    changeSlide(2)
                }
            }
            if (scrollY == slidePos[3] && currentSlide != 3) changeSlide(3);
            if (scrollY > slidePos[3] && scrollY < slidePos[4]) {
                if (event.scrollDirection == "FORWARD") {
                    changeSlide(4);
                } else if (event.scrollDirection == "REVERSE") {
                    changeSlide(3)
                }
            }
            if (scrollY == slidePos[4] && currentSlide != 4) changeSlide(4);
            if (scrollY > slidePos[4]) {
                currentSlide = 4;
                runAnimation(4);
                console.log("anime4");
            }

            console.log("progress =", event.progress, event.scrollDirection, "currentSlide =", currentSlide, scrollController.scrollPos());
        }, 100);
    }

    function changeSlide(index) { // index = 1
        console.log("change ", index);
        currentSlide = index;
        runAnimation(currentSlide);
        scrollController.scrollTo(slidePos[currentSlide]);
    }

    function runAnimation(index) {
        var slideDist = 0;
        if (window.innerWidth < 1024) {
            slideDist = window.innerHeight;
            TweenMax.to($sliderWrapper, switchTime, { y: -slideDist * (index) });
        } else {
            slideDist = window.innerWidth;
            TweenMax.to($sliderWrapper, switchTime, { x: -slideDist * (index) });
        }


        TweenMax.to(".counter", switchTime, {
            rotationX: 72 * index, transformOrigin: '50% 50% -100px'
        })

        var circleProgress = $("#progress .progress__circle");
        var r = circleProgress.attr("r");
        var c = Math.PI * r * 2;
        TweenMax.to(".progress__circle", switchTime, { "stroke-dashoffset": c * (0.8 - 0.2 * index) });

        var decoDots = $(".deco-dot ul li");
        decoDots.each(function (dot_index) {
            TweenMax.to($(this), { className: dotClass[index][dot_index] });
        })
    }

    function createScrollAnimation() {
        // couting number
        var counter = $(".counter"),
            counterNumber = $(".counter").children();
        TweenMax.set(counter, { transformStyle: 'preserve-3d' });
        $.each(counterNumber, function (index, element) {
            TweenMax.to(element, switchTime, { rotationX: (-72 * index), transformOrigin: '50% 50% -100px' });
        });
        // number circle
        var circleProgress = $("#progress .progress__circle");
        var r = circleProgress.attr("r");
        var c = Math.PI * r * 2;
        TweenMax.set(".progress__circle", { "stroke-dasharray": c, "stroke-dashoffset": c * 0.8 });
    }

    $(document).ready(function () {
        scrollSlider();
    });

    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('test')) {
        var debug = $("#debug");
        debug.css({ position: "fixed", top: "100px", left: 0, "z-index": 99 });
        var sh = $slides.height();
        var vh = window.innerHeight;
        debug.html(sh + " " + vh);

        document.addEventListener("scroll", () => {
            sh = $slides.height();
            vh = window.innerHeight;
            $("#debug").html(sh + " " + vh);
        })
    }

})(jQuery);

