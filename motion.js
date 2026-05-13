window.addEventListener("scroll", function() {
    let value = window.scrollY;

    document.getElementById("one").style.top = value * 0.1 + "px";
    document.getElementById("third").style.top = value * 0.9 + "px";
    document.getElementById("two").style.top = value * 0.4 + "px";
});

let lastScroll = 0;
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function() {
    let currentScroll = window.scrollY;

    if (currentScroll > lastScroll) {
        navbar.style.transform = "translate(-50%, -120%)";
    } else {
        navbar.style.transform = "translate(-50%, 0)";
    }

    lastScroll = currentScroll;
});
const elements = document.querySelectorAll(".about-box, .text h2, .text h3, .text p, .img-box img, .title, .subtitle, .box, .cards, .demo-card, .devs, .footer");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
});

elements.forEach(el => {
    el.classList.add("fade");
    observer.observe(el);
});