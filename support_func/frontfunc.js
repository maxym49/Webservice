

function togBar() { 
    document.querySelector('.sidebar').classList.toggle('active');
}

function moveLogo() { 
        document.querySelector('span.heffect').classList.add('animated');
        document.querySelector('span.heffect').classList.add('flash');
}


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 && document.body.scrollTop < 1400 || document.documentElement.scrollTop > 20 && document.documentElement.scrollTop < 1400) {
        document.querySelector(".scrollup").style.display = "block";
    } else {
        document.querySelector(".scrollup").style.display = "none";
    }
}
