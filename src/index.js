const isMobile = (window.innerWidth < 1024) ? true : false;

const mobile_icon = document.getElementById("mobile-icon");
const mobile_menu = document.getElementById("mobile-menu");
// hamburgers 三條線
const hamburgers = document.querySelectorAll("#mobile-icon .button-hamburger div");

const navBar = document.querySelector("nav");
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll("nav .container ul li");

const compoundList = document.querySelector("#compound .slick-container .item-list");

// 建立locomotive + scrollmagic的環境
gsap.registerPlugin(ScrollTrigger);
const pageContainer = document.querySelector("#page-container");
const scroller = new LocomotiveScroll({
    el: pageContainer,
    smooth: true
});
scroller.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy(pageContainer, {
    scrollTop(value) {
        return arguments.length
            ? scroller.scrollTo(value, 0, 0)
            : scroller.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    pinType: pageContainer.style.transform ? "transform" : "fixed"
});
ScrollTrigger.defaults({ scroller: pageContainer });

// header navigation backgroundcolor and size
ScrollTrigger.create({
    start: 0,
    end: 30,
    onLeave: ({progress, direction, isActive}) => {
        navBar.classList.add("scrolled");
        hamburgers.forEach((item) => {
            item.style.background = "#3279ce";
        });
    },
    onEnterBack: ({progress, direction, isActive}) => {
        navBar.classList.remove("scrolled");
        hamburgers.forEach((item) => {
            item.style.background = "#FFF";
        });
    }
});

// Current Section Menu Item Active
sections.forEach((section) => {
    let sectionId = section.getAttribute("section-name");
    ScrollTrigger.create({
        trigger: section,
        start: "top 70",
        end: "bottom top",
        onEnter: (self) => {
            navLi.forEach((li) => {
                li.classList.remove("active");
                if (li.classList.contains(sectionId)) {
                    li.classList.add("active");
                }
            });
        },
        onEnterBack: (self) => {
            navLi.forEach((li) => {
                li.classList.remove("active");
                if (li.classList.contains(sectionId)) {
                    li.classList.add("active");
                }
            });
        }
    });
});



let lastIpdateCompoundItem;
function next() {
    compoundList.scrollLeft += document.querySelector("#compound .slick-container .item-list .item").clientWidth;
    setTimeout(() => {
        compoundList.append(compoundList.children[0]);
    }, 400);
}

function previous() {
    compoundList.scrollLeft -= document.querySelector("#compound .slick-container .item-list .item").clientWidth;
    setTimeout(() => {
        compoundList.prepend(compoundList.children[compoundList.children.length - 1]);
    }, 400);
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


// 箭頭動畫間隔
var arrow = $("#arrow");
var interval = 1100;
setInterval(function () { // loop the function (the delay)
    arrow.removeClass("arrow-animation"); // remove the existing animation. used to reset the animation
    setTimeout(function () { // using setTimeout to create the delay.
        arrow.addClass("arrow-animation"); // add the animation class, to start animation
    })
}, interval);


// Product Slideshow
var $slider = $('.scroll-slider'),
    $slides = $('.scroll-slide'),
    $sliderWrapper = $('.scroll-wrapper'),
    $firstSlide = $slides.first();

var slidePos = null;
var currentSlide = 0;
var switchTime = 0.5;

var isInProductSlide = false;
var resizeAnimeTimeout = null;


var dotClass = [
    ['bg-emphasize', 'bg-main', 'bg-second', 'bg-second', 'bg-second'],
    ['bg-second', 'bg-emphasize', 'bg-main', 'bg-second', 'bg-second'],
    ['bg-second', 'bg-second', 'bg-emphasize', 'bg-main', 'bg-second'],
    ['bg-second', 'bg-second', 'bg-second', 'bg-emphasize', 'bg-main'],
    ['bg-second', 'bg-second', 'bg-second', 'bg-second', 'bg-main'],
];

var desktopDuration = 5000;
var mobileDuration = 10000;
var sceneDuration = (window.innerWidth < 1024) ? mobileDuration : desktopDuration;

//Create Tween
scrollTimeline = createScrollAnimation();



if (isMobile) {
    scrollController = new ScrollMagic.Controller();
    scrollScene = new ScrollMagic.Scene({
        triggerElement: "#scroll-slider",
        triggerHook: "onLeave",
        duration: sceneDuration
    })
        .setPin("#scroll-slider")
        .addTo(scrollController)
        .on('progress', _.throttle(progressAction, 200))


    var resizeAnimeTimeout = null;
    $(window).on( 'resize', function() {
        console.log("resize");
        if (window.scrollY >= scrollScene.triggerPosition() && window.scrollY <= scrollScene.triggerPosition()+scrollScene.duration()) {
            clearTimeout(resizeAnimeTimeout);
            resizeAnimeTimeout = setTimeout(function () {
                //console.log("runAnimation");
                runAnimation(currentSlide);
            }, 500);
        }

        if ($slides.height() >= window.innerHeight) {
            $(".deco-dot").css({"bottom": (64+$slides.height()-window.innerHeight)+"px"});
        }
    });
} else {
    var productScroll = ScrollTrigger.create({
        scroller: pageContainer,
        trigger: "#scroll-slider",
        pin: true,
        start: "top top",
        end: "+="+sceneDuration,

        scrub: true,
        onUpdate: progressAction,
        onToggle: (self) => {
            isInProductSlide = self.isActive;
        }
    })
}


ScrollTrigger.addEventListener("refresh", () => {
    scroller.update(); //locomotive-scroll
}); 
ScrollTrigger.refresh();


function progressAction(event) {
    var progress = event.progress;
    if (progress >= 0.0 && progress <  0.2) {
        changeSlide(0);
    }
    if (progress >= 0.2 && progress <  0.4) {
        changeSlide(1);
    }
    if (progress >= 0.4 && progress <  0.6) {
        changeSlide(2);
    }
    if (progress >= 0.6 && progress <  0.8) {
        changeSlide(3);
    }
    if (progress >= 0.8 && progress <= 1.0) {
        changeSlide(4);
    }
}

function changeSlide(index) { // index = 1
    //console.log("change to ", index);
    currentSlide = index;
    runAnimation(currentSlide);
}

function runAnimation(index) {
    var slideDist = 0;
    if (window.innerWidth < 1024) {
        slideDist = $slides.height();
        //console.log("slideDist =", slideDist);
        TweenMax.to($sliderWrapper, switchTime, { y: -slideDist * (index) });
    } else {
        slideDist = window.innerWidth;
        TweenMax.to($sliderWrapper, switchTime, { x: -slideDist * (index) });
    }

    TweenMax.to(".counter", {
        duration: switchTime,
        rotationX: 72 * index, 
        transformOrigin: '50% 50% -100px'
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