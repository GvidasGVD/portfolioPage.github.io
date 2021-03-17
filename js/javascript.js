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
    $("#currentPossition").on("click", function () {
        replayAnimatedText();
    })

    navToggle.on('click', () => {
        navMenu.css('right', '0');
    });

    $('#close-flyout').on('click', () => {
        navMenu.css('right', '-100%');
    });

    $(document).on('click', (e) => {
        let target = $(e.target);
        if (target.closest('#nav-toggle').length > 0) {
            return false;
        }
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

        if(scrollTop < 600){
            if($("#realEstateProjectCard").css('left') === '0px') {
                $("#realEstateProjectCard").css({'left':'-2000px', 'opacity': 0});
            }
        }

        if(scrollTop >= 600){
            if($("#realEstateProjectCard").css('left') === '-2000px'){
                $("#realEstateProjectCard").css({'left':'0px', 'opacity': 1});
            }
        }

        if(scrollTop < 800){
            if($("#clicGameCard").css('left') === '0px') {
                $("#clicGameCard").css({'left':'-2000px', 'opacity': 0});
            }
        }

        if(scrollTop >= 800){
            if($("#clicGameCard").css('left') === '-2000px'){
                $("#clicGameCard").css({'left':'0px', 'opacity': 1});
            }
        }

        if(scrollTop < 1000){
            if($("#portfolioPageCard").css('left') === '0px') {
                $("#portfolioPageCard").css({'left':'-2000px', 'opacity': 0});
            }
        }

        if(scrollTop >= 1000){
            if($("#portfolioPageCard").css('left') === '-2000px'){
                $("#portfolioPageCard").css({'left':'0px', 'opacity': 1});
            }
        }

        if(scrollTop < 5800){
            if($("#socialLinksBox").css('display') === 'none') {
                $("#socialLinksBox").css('display', 'flex');
            }
        }

        if(scrollTop >= 5800){
            if($("#socialLinksBox").css('display') === 'flex'){
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
    //Moving Animation Event
    animatedCard.addEventListener("mousemove", (e) => {
        let xAxis =  (e.pageX - window.innerWidth/2) / 4;
        let yAxis = - (e.pageY - window.innerHeight/2) / 10;
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
    if($("#firstContentBtn").css('display') === 'none'){
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



