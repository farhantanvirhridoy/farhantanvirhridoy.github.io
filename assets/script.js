// Typing Animation
const roles = [
  "I am an Engineer",
  "I am a Teacher",
  "I am a Developer",
  "I am a Designer",
  "I am a Problem Solver",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

const typingElement = document.getElementById("typing-text");

function typeText() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeText, 500);
      return;
    }

    setTimeout(typeText, deletingSpeed);
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeText, pauseTime);
      return;
    }

    setTimeout(typeText, typingSpeed);
  }
}

// Start typing animation unless the visitor has asked for reduced motion.
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  typeText();
}

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeSymbol = document.getElementById("theme-symbol");
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  const theme = html.getAttribute("data-theme");
  const newTheme = theme === "light" ? "dark" : "light";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeSymbol.className = "fas fa-moon";
    themeToggle.setAttribute("aria-label", "Switch to light theme");
    themeToggle.setAttribute("aria-pressed", "true");
  } else {
    themeSymbol.className = "fas fa-sun";
    themeToggle.setAttribute("aria-label", "Switch to dark theme");
    themeToggle.setAttribute("aria-pressed", "false");
  }
}

// Mobile Navigation
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

function toggleMenu() {
  const isOpen = navLinks.classList.toggle("active");
  hamburger.setAttribute("aria-expanded", String(isOpen));
  hamburger.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");

  // Animate hamburger lines
  const spans = hamburger.querySelectorAll("span");
  if (isOpen) {
    spans[0].style.transform = "rotate(45deg) translateY(8px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translateY(-8px)";
  } else {
    spans[0].style.transform = "rotate(0) translateY(0)";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "rotate(0) translateY(0)";
  }
}

hamburger.addEventListener("click", toggleMenu);

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open navigation menu");

    // Reset hamburger animation
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "rotate(0) translateY(0)";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "rotate(0) translateY(0)";
  });
});

// Scroll Animations
const sections = document.querySelectorAll("section");

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animate skill bars when skills section is visible
      if (entry.target.id === "skills") {
        animateSkillBars();
      }
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});

// Animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    bar.style.width = width;
  });
}

document.getElementById("copyright-year").textContent = new Date().getFullYear();

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.style.padding = "10px 0";
    navbar.style.boxShadow = "0 2px 15px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.padding = "15px 0";
    navbar.style.boxShadow = "none";
  }
});

// Active navigation link
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href").slice(1) === current) {
      item.classList.add("active");
    }
  });
});
