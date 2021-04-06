var char = 0;
var timer = null;
var text = null;
var splitText = null;
var strText = null;


$(function () {
    textAnimation();
    let headerElem = $('header');
    let navToggle = $('#nav-toggle');
    let navMenu = $('#nav-menu');

    function attachEvents() {
        $('#testimonials-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<a href="#" class="slick-arrow slick-prev"><</a>',
            nextArrow: '<a href="#" class="slick-arrow slick-next">></a>'
        });

        $(document).on('keydown', function (event) {
            if (event.key == "Escape" && $("#projectsContent").hasClass("active")) {
                $("#projectsModal").fadeOut(200);
                $("#projectsContent").removeClass("active");
            }
        });

        $(window).resize(function () {
            setDivisorForAnimatedCard();
        });

        $(".closeModalBtn").on('click', function () {
            $("#projectsModal").fadeOut(200);
            $("#projectsContent").removeClass("active");
        });

        $("#currentPossition").on("click", function () {
            replayAnimatedText();
        });

        $(document).on('click', (e) => {
            let target = $(e.target);
            if (target.closest('#nav-toggle').length > 0) {
                return false;
            }
            navMenu.css('right', '-100%');
        });
    }


    navToggle.on('click', () => {
        navMenu.css('right', '0');
    });

    $('#close-flyout').on('click', () => {
        navMenu.css('right', '-100%');
    });



    $('#mainPageBlock').scroll(() => {
        let scrollTop = $('#mainPageBlock').scrollTop();

        if (scrollTop > 0) {
            headerElem.css('background', 'rgba(50, 50, 50, 0.7)');
            navToggle.css('border-color', '#fff');
            navToggle.find('.strip').css('background-color', '#fff');
        } else {
            headerElem.css('background', 'rgba(0, 0, 0, 0.3');
            navToggle.css('border-color', '#fff');
            navToggle.find('.strip').css('background-color', '#fff');
        }

        if (scrollTop < 600) {
            if ($("#realEstateProjectCard").css('left') === '0px') {
                $("#realEstateProjectCard").css({ 'left': '-2000px', 'opacity': 0 });
            }
        }

        if (scrollTop >= 600) {
            if ($("#realEstateProjectCard").css('left') === '-2000px') {
                $("#realEstateProjectCard").css({ 'left': '0px', 'opacity': 1 });
            }
        }

        if (scrollTop < 800) {
            if ($("#clicGameCard").css('left') === '0px') {
                $("#clicGameCard").css({ 'left': '-2000px', 'opacity': 0 });
            }
        }

        if (scrollTop >= 800) {
            if ($("#clicGameCard").css('left') === '-2000px') {
                $("#clicGameCard").css({ 'left': '0px', 'opacity': 1 });
            }
        }

        if (scrollTop < 1000) {
            if ($("#portfolioPageCard").css('left') === '0px') {
                $("#portfolioPageCard").css({ 'left': '-2000px', 'opacity': 0 });
            }
        }

        if (scrollTop >= 1000) {
            if ($("#portfolioPageCard").css('left') === '-2000px') {
                $("#portfolioPageCard").css({ 'left': '0px', 'opacity': 1 });
            }
        }

        if (scrollTop < 5800) {
            if ($("#socialLinksBox").css('display') === 'none') {
                $("#socialLinksBox").css('display', 'flex');
            }
        }

        if (scrollTop >= 5800) {
            if ($("#socialLinksBox").css('display') === 'flex') {
                $("#socialLinksBox").css('display', 'none');
            }
        }

        if (window.innerWidth > 800) {
            headerElem.css(scrollTop >= 200 ? { 'padding': '0.8rem 0', 'box-shadow': '0 -2px 10px 1px #999', 'width': 'calc(100% - 17px)' } : { 'padding': '1.5rem 0', 'width': 'calc(100% - 17px)' });
        }
    });

    $('#mainPageBlock').trigger('scroll');

    //Movement Animation to happen
    const animatedCard = document.querySelector(".about-me-images-container");
    const animatedCardInner = document.querySelector(".about-me-images-container-inner");
    const container = document.getElementById("aboutMeImagesContainer");
    var divisor = 4;
    //Moving Animation Event
    animatedCard.addEventListener("mousemove", (e) => {
        let xAxis = (e.pageX - window.innerWidth / 2) / divisor;
        let yAxis = - (e.pageY - window.innerHeight / 2) / 10;
        animatedCardInner.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    //Animate In
    animatedCard.addEventListener("mouseenter", (e) => {
        //Popout
        container.style.transform = "translateZ(50px) scale(1.1)";
    });
    //Animate Out
    animatedCard.addEventListener("mouseleave", (e) => {
        animatedCardInner.style.transition = "all 0.5s ease";
        animatedCardInner.style.transform = `rotateY(0deg) rotateX(0deg)`;
        //Popback
        container.style.transform = "translateZ(0px)";
    });

    function setDivisorForAnimatedCard() {
        (window.innerWidth <= 1190 && window.innerWidth >= 580) ? divisor = 15 : divisor = 4;
        return divisor;
    }

    attachEvents();
})

function textAnimation() {
    text = document.querySelector(".animated-text");
    strText = text.textContent;
    splitText = strText.split("");
    text.textContent = "";
    for (let i = 0; i < splitText.length; i++) {
        if (splitText[i] === " " || splitText[i] === "-") {
            text.innerHTML += "<span style='visibility: hidden;'>-</span>";
        } else {
            text.innerHTML += "<span>" + splitText[i] + "</span>";
        }

        if (i + 1 === splitText.length) {
            char = 0;
            timer = setInterval(onTick, 20);
        }
    }
}

function onTick() {
    var span = text.querySelectorAll('span')[char];
    span.classList.add('fade');
    char++;
    if (char === splitText.length) {
        complete();
        return;
    }
}

function replayAnimatedText() {
    $("#currentPossition").css('opacity', 0);
    textAnimation();
}

function complete() {
    $("#currentPossition").css('opacity', 1);
    clearInterval(timer);
    timer = null;
}

function readMore(e) {
    if ($("#firstContentBtn").css('display') === 'none') {
        $("#firstContentBtn").show();
        $("#aboutMeTextImage").css("opacity", 1);
        $("#secondText").css("opacity", 0);

    } else {
        $("#secondContentBtn").show();
        $("#aboutMeTextImage").css("opacity", 0);
        $("#secondText").css("opacity", 1);
    }
    $(e).hide();
}

var projectModalItem = 'first';
var projectModalTimer;

function setProjectModaltimer(){
    projectModalTimer = setInterval(modalTimer, 4000);
}

function modalTimer() {
    setProjectModalPicture(imageNoProjectModal);
}

function projectModalStopTimer() {
    clearInterval(projectModalTimer);
}

function showProjectModal(item) {
    projectModalItem = item;
    switch (item) {
        case 'first':
            $("#projectModalGitHubLink").attr('href', 'https://github.com/GvidasGVD/realEstatePage.github.io');
            $("#projectModalDemoLink").attr('href', 'https://gvidasgvd.github.io/realEstatePage.github.io/');
            $("#projectModalInfoSpecificText").text('Real Estate web page was created using HTML, CSS, JS and jQuery. Main purpose of the page' +
                ' is to nicely present the company, which offers to the customers services like: consultation on buying, selling, investing in the' +
                ' property. Also you can find equities listed as well as agents information and contacts and of course some clients reviews.');
            $("#projectModalHeader").text('Real Estate Web Page');
            break;
        case 'second':
            $("#projectModalGitHubLink").attr('href', 'https://github.com/GvidasGVD/clickMoneyGame.github.io');
            $("#projectModalDemoLink").attr('href', 'https://gvidasgvd.github.io/clickMoneyGame.github.io/');
            $("#projectModalInfoSpecificText").text('Click game was created using HTML, CSS, JS. Main purpose of the' +
                ' game is to reach $300 billion in cash by clicking the golden button and buying property, which every second gives' +
                ' 10% profit of the equity price.');
            $("#projectModalHeader").text('Click Game');
            break;
        case 'third':
            $("#projectModalGitHubLink").attr('href', 'https://github.com/GvidasGVD/portfolioPage.github.io');
            $("#projectModalDemoLink").attr('href', 'https://gvidasgvd.github.io/portfolioPage.github.io/');
            $("#projectModalInfoSpecificText").text('My portfolio page which provides information about my programming skills, some history' +
                ' of my working experience, my certifications and studies, and of course projects with the links. Hope you\'ve enjoyed it!');
            $("#projectModalHeader").text('Portfolio Web Page');
            break;
    }
    setProjectModalPicture(0);

    $(".popup-modal").show();
    setTimeout(function () {
        $("#projectsContent").addClass("active");
        $("#projectsModal ").css("display", "flex");
    }, 10);
}

const realEstateProjectModalImages = ['nt1.jpg', 'nt7.jpg', 'nt5.jpg', 'nt6.jpg'];
const clickGameProjectModalImages = ['game1.jpg', 'game2.jpg', 'game3.jpg', 'game4.jpg'];
const mainPortfolioProjectModalImages = ['mainPage7.jpg', 'mainPage3.jpg', 'mainPage4.jpg', 'mainPage5.jpg'];
const baseURL = "url('https://gvidasgvd.github.io/portfolioPage.github.io/modalImages/";
var imageNoProjectModal = 0
function setProjectModalPicture(item = imageNoProjectModal) {
    projectModalStopTimer();
    var section = $("#projectModalTop");
    if (projectModalItem === 'first') {
        section.css('background-image', baseURL + realEstateProjectModalImages[item] + "'")
    } else if (projectModalItem === 'second') {
        section.css('background-image', baseURL + clickGameProjectModalImages[item] + "'")
    } else if (projectModalItem === 'third') {
        section.css('background-image', baseURL + mainPortfolioProjectModalImages[item] + "'")
    }
    imageNoProjectModal++;
    if (imageNoProjectModal >= 4) {
        imageNoProjectModal = 0;
    }
    setProjectModaltimer();
}








