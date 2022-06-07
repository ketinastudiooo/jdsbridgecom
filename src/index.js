const pizzaDotStyle = {
    target: "bg-emphasize",
    secondary: "bg-main",
    normal: "bg-second"
}

const mobile_icon = document.getElementById("mobile-icon");
const mobile_menu = document.getElementById("mobile-menu");
// hamburgers 三條線
const hamburgers = document.querySelectorAll("#mobile-icon .button-hamburger div");

const navBar = document.querySelector("nav");
const sections = document.querySelectorAll("section.section_item");
const navLi = document.querySelectorAll("nav .container ul li");

const compoundList = document.querySelector("#compound .slick-container .item-list");
/*const pizzaBox = document.querySelector("#product-show .product-box");*/
const pizzaNumber = document.querySelector("#product-show .now");
const pizzaDots = document.querySelectorAll("#product-show .deco-dot li");

let lastIpdateCompoundItem;
function next() {
    compoundList.scrollLeft += document.querySelector("#compound .slick-container .item-list .item").clientWidth;
    console.log(lastIpdateCompoundItem);
    /*if (lastIpdateCompoundItem) {
        clearTimeout(lastIpdateCompoundItem);
    }*/

    setTimeout(() => {
        compoundList.append(compoundList.children[0]);
    }, 400);

    // or gsap
}

function previous() {
    compoundList.scrollLeft -= document.querySelector("#compound .slick-container .item-list .item").clientWidth;

    /*if (lastIpdateCompoundItem) {
        clearTimeout(lastIpdateCompoundItem);
    }*/

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

// 進來的overlay 1秒
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

// 箭頭動畫間隔
var arrow = $("#arrow");
var interval = 3000;

setInterval(function() { // loop the function (the delay)
  arrow.removeClass("arrow-animation"); // remove the existing animation. used to reset the animation
  setTimeout(function() { // using setTimeout to create the delay.
    arrow.addClass("arrow-animation"); // add the animation class, to start animation
  })
}, interval);


// horizontal slider
!(function($) {

    'use strict';
  
    var $slider = $('.scroll-slider'),
        $slides = $('.scroll-slide'),
        $sliderWrapper = $('.scroll-wrapper'),
        $firstSlide = $slides.first();

    var settings = {},
        resizing = false,
        scrollController = null,
        scrollTimeline = null,
        progress = 0,
        scrollScene = null;


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
        
        // On resize

        /*$(window).on( 'resize', function() {
          clearTimeout(resizing);
          resizing = setTimeout(function() {
            progress = scrollTimeline.progress();
            var axisY = window.scrollY;
            setDimensions();
            window.scrollTo(0, axisY);
          }, 100); 
        });*/
    }

    function setDimensions() {
        settings.slideWidth = window.innerWidth;
        settings.slideHeight = window.innerHeight;

        // Calculate slider width and height
        settings.sliderWidth = Math.ceil((settings.slideWidth * $slides.length));
        settings.sliderHeight = $firstSlide.outerHeight(true);

        // Set slider width and height
        if (window.innerWidth<1024) {
            $slides.css({"max-height":settings.slideHeight, "min-height": settings.slideHeight, "height": settings.slideHeight});
            $sliderWrapper.height(Math.ceil((settings.slideHeight * $slides.length)));
        } else {
            $sliderWrapper.width(settings.sliderWidth);
        }
        
        // Set scene
        setScene();
    }

    function setScene() {
        if (scrollScene != null && scrollTimeline != null) {
            //progress = 0;
            scrollScene.destroy(true);
            //Create Tween
            scrollTimeline = createScrollAnimation();

            scrollTimeline.progress(progress);

            // Create scene to pin and link animation
            var scrollDuration = (window.innerWidth > 1023) ? settings.sliderWidth: $firstSlide.height()*4;
            scrollScene = new ScrollMagic.Scene({
                triggerElement: settings.slider,
                triggerHook: "onLeave",
                duration: scrollDuration
            })
            .setPin(settings.slider)
            .setTween(scrollTimeline)
            .addTo(scrollController)
            .on('start', function (event) {
                scrollTimeline.time(0);
            });
            
        } else {
            // Init ScrollMagic controller
            scrollController = new ScrollMagic.Controller();

            //Create Tween
            scrollTimeline = createScrollAnimation();

            scrollTimeline.progress( progress );

            // Create scene to pin and link animation
            var scrollDuration = (window.innerWidth > 1023) ? settings.sliderWidth: $firstSlide.height()*4;
            scrollScene = new ScrollMagic.Scene({
                triggerElement: settings.slider,
                triggerHook: "onLeave",
                duration: scrollDuration
            })
            .setPin(settings.slider)
            .setTween(scrollTimeline)
            .addTo(scrollController)
            .on('start', function (event) {
                scrollTimeline.time(0);
            });
        }
        
    }

    function createScrollAnimation () {
        //Create Tween
        scrollTimeline = new TimelineMax();
        var switchTiming = [];
        var switchTime = 1;
        // add slide
        
        if (window.innerWidth < 1024) { // mobile
            var slideMoveDistance = $slides.height();
            scrollTimeline.to( $sliderWrapper, 5, { y: -slideMoveDistance*1}, 0);
            scrollTimeline.to( $sliderWrapper, 5, { y: -slideMoveDistance*2}, 5);
            scrollTimeline.to( $sliderWrapper, 5, { y: -slideMoveDistance*3}, 10);
            scrollTimeline.to( $sliderWrapper, 5, { y: -slideMoveDistance*4}, 15);
            scrollTimeline.to( $sliderWrapper, 2, {}, 19);

            switchTiming = [3, 8, 13, 18];
        } else { // pc
            var slideMoveDistance = $slides.width();
            /*scrollTimeline.to( $sliderWrapper, 4, { x: -slideMoveDistance*2/5, ease: Power2.easeInOut }, 0);
            scrollTimeline.to( $sliderWrapper, 2, { x: -slideMoveDistance*5/5, ease: Power2.easeInOut }, 4);
            scrollTimeline.to( $sliderWrapper, 3, { x: -slideMoveDistance*7/5, ease: Power2.easeInOut }, 6);
            scrollTimeline.to( $sliderWrapper, 2, { x: -slideMoveDistance*10/5, ease: Power2.easeInOut }, 9);
            scrollTimeline.to( $sliderWrapper, 3, { x: -slideMoveDistance*12/5, ease: Power2.easeInOut }, 11);
            scrollTimeline.to( $sliderWrapper, 2, { x: -slideMoveDistance*15/5, ease: Power2.easeInOut }, 14);
            scrollTimeline.to( $sliderWrapper, 3, { x: -slideMoveDistance*17/5, ease: Power2.easeInOut }, 16);
            scrollTimeline.to( $sliderWrapper, 2, { x: -slideMoveDistance*20/5, ease: Power2.easeInOut }, 19);*/
            scrollTimeline.to( $sliderWrapper, 5, { x: -slideMoveDistance*1}, 0);
            scrollTimeline.to( $sliderWrapper, 5, { x: -slideMoveDistance*2}, 5);
            scrollTimeline.to( $sliderWrapper, 5, { x: -slideMoveDistance*3}, 10);
            scrollTimeline.to( $sliderWrapper, 5, { x: -slideMoveDistance*4}, 15);
            scrollTimeline.to( $sliderWrapper, 2, {}, 19);


            //switchTiming = [3, 7.5, 11, 14.5];

            switchTiming = [3, 8, 13, 18];
        }
        scrollTimeline.to( $sliderWrapper, 1, {})
        
    
        // couting number
        var counter = $(".counter"),
        counterNumber = $(".counter").children();
        TweenMax.set(counter, {transformStyle:'preserve-3d'});
        $.each(counterNumber, function(index, element) {
            TweenMax.to(element, 1, {rotationX:(-72 * index), transformOrigin:'50% 50% -100px'});
        });
        for (let i=0; i<switchTiming.length; i++) {
            scrollTimeline.add(TweenMax.to(counter, switchTime, {
                rotationX:'+=72', transformOrigin:'50% 50% -100px'
            }), switchTiming[i]);
        }
        
    
        // number circle
        var circleProgress = $("#progress .progress__circle");
        var r = circleProgress.attr("r");
        var c = Math.PI*r*2;
        var circleTl = new TimelineMax({ paused: true });
        TweenMax.set(".progress__circle", {"stroke-dasharray": c, "stroke-dashoffset": c*0.8});
        scrollTimeline.add(TweenMax.to(".progress__circle", 1, {"stroke-dashoffset": c*0.6}), switchTiming[0]);// 1->2
        scrollTimeline.add(TweenMax.to(".progress__circle", 1, {"stroke-dashoffset": c*0.4}), switchTiming[1]);// 2->3
        scrollTimeline.add(TweenMax.to(".progress__circle", 1, {"stroke-dashoffset": c*0.2}), switchTiming[2]);// 3->4
        scrollTimeline.add(TweenMax.to(".progress__circle", 1, {"stroke-dashoffset": 0}),     switchTiming[3]);// 3->4
    
        // slide dot
        var decoDots = $(".deco-dot ul li");
        TweenMax.set(decoDots[0], {className:"bg-emphasize"});
        TweenMax.set(decoDots[1], {className:"bg-main"});
        TweenMax.set(decoDots[2], {className:"bg-second"});
        TweenMax.set(decoDots[3], {className:"bg-second"});
        TweenMax.set(decoDots[4], {className:"bg-second"});
    
        scrollTimeline.add(TweenMax.to(decoDots[0], 1, {className: "bg-second"}),    switchTiming[0]); // 1->2
        scrollTimeline.add(TweenMax.to(decoDots[1], 1, {className: "bg-emphasize"}), switchTiming[0]);
        scrollTimeline.add(TweenMax.to(decoDots[2], 1, {className: "bg-main"}),      switchTiming[0]);
        
        scrollTimeline.add(TweenMax.to(decoDots[1], 1, {className: "bg-second"}),    switchTiming[1]); // 2->3
        scrollTimeline.add(TweenMax.to(decoDots[2], 1, {className: "bg-emphasize"}), switchTiming[1]);
        scrollTimeline.add(TweenMax.to(decoDots[3], 1, {className: "bg-main"}),      switchTiming[1]);
    
        scrollTimeline.add(TweenMax.to(decoDots[2], 1, {className: "bg-second"}),    switchTiming[2]); // 3->4
        scrollTimeline.add(TweenMax.to(decoDots[3], 1, {className: "bg-emphasize"}), switchTiming[2]);
        scrollTimeline.add(TweenMax.to(decoDots[4], 1, {className: "bg-main"}),      switchTiming[2]);
    
        scrollTimeline.add(TweenMax.to(decoDots[3], 1, {className: "bg-second"}),    switchTiming[3]); // 4->5

        return scrollTimeline;
    }
    
    $(document).ready(function() {
        scrollSlider(); 
    });


    let urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('test')) {
        var debug = $("#debug");
        debug.css({position:"fixed", top: "100px", left: 0, "z-index":99});
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

