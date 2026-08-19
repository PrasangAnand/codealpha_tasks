// Mobile Menu

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }
});


// Close mobile menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
    });

});


// Dark / Light Mode

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "D☀️";
        localStorage.setItem("theme", "dark");
    } else {
        themeBtn.textContent = "L🌙";
        localStorage.setItem("theme", "light");
    }

});


// Remember theme

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
}


// Contact Form

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value;

    alert(`Thanks ${name}! Your message has been received.`);

    contactForm.reset();

});