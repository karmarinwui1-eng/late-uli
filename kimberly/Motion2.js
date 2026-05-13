const elements = document.querySelectorAll("section, .box, .can, .love, img");

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