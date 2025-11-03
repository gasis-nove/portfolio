// --- EXISTING PORTFOLIO LOGIC ---

// Theme Toggle
const toggle = document.getElementById("theme-toggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggle.textContent = "☀️";
}

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const theme = body.classList.contains("dark") ? "dark" : "light";
  toggle.textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", theme);
});

// Mobile Menu Toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Smooth Scroll & Active Link
document.querySelectorAll(".nav-item").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
    navLinks.classList.remove("show");
    
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
    link.classList.add("active");
  });
});

// Reveal on Scroll
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach(r => {
    const top = r.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) r.classList.add("active");
  });
});

// Footer Year
document.getElementById("year-footer").textContent = new Date().getFullYear();


// --- NEW IMAGE SLIDER LOGIC ---

// Object to store the slide index for each slider on the page
let slideIndex = {};

// Function to initialize a slider (generate dots, set initial index)
function initializeSlider(sliderId) {
  const slides = document.querySelector(`#${sliderId}`).querySelectorAll('.slide');
  const dotContainer = document.querySelector(`#${sliderId}`).querySelector('.dot-container');
  
  slideIndex[sliderId] = 1; // Start at the first slide (index 1)
  
  // Generate dots dynamically
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.onclick = () => currentSlide(i + 1, sliderId);
    dotContainer.appendChild(dot);
  }
  
  showSlides(1, sliderId);
}

// Function to move to the next or previous slide
window.plusSlides = function(n, sliderId) {
  showSlides(slideIndex[sliderId] += n, sliderId);
}

// Function to jump to a specific slide using dots
window.currentSlide = function(n, sliderId) {
  showSlides(slideIndex[sliderId] = n, sliderId);
}

// Core function to display the correct slide
function showSlides(n, sliderId) {
  let i;
  const slides = document.querySelector(`#${sliderId}`).querySelectorAll('.slide');
  const dots = document.querySelector(`#${sliderId}`).querySelectorAll('.dot');
  
  if (slides.length === 0) return;
  
  // Loop back to the start if we go past the last slide
  if (n > slides.length) { slideIndex[sliderId] = 1 }
  
  // Loop to the end if we go before the first slide
  if (n < 1) { slideIndex[sliderId] = slides.length }
  
  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  // Remove the active class from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active-dot", "");
  }
  
  // Display the current slide and mark the current dot as active
  slides[slideIndex[sliderId] - 1].style.display = "block";
  dots[slideIndex[sliderId] - 1].className += " active-dot";
}

// Initialize all sliders on the page once the document is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeSlider('project-slider-1');
});
