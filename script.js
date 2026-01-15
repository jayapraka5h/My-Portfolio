// Typing Animation
const roles = [
  "Full Stack Developer",
  "AI & ML Enthusiast",
  "Java Developer",
  "Frontend Developer",
];
const typingText = document.getElementById("typing-text");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typeSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500; // Pause before new word
  }

  setTimeout(type, typeSpeed);
}

document.addEventListener("DOMContentLoaded", type);

// Mobile Menu
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Close mobile menu on click
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// Navbar Blur Effect on Scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("shadow-lg");
    navbar.style.background = "rgba(2, 6, 23, 0.85)";
  } else {
    navbar.classList.remove("shadow-lg");
    navbar.style.background = "rgba(2, 6, 23, 0.6)";
  }
});

// Intersection Observer for Reveal Animations
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document
  .querySelectorAll(
    ".reveal, .edu-line-reveal, .edu-dot-reveal, .edu-card-left, .edu-card-right"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Projects Filter (Simple Implementation)
const filterBtns = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class
    filterBtns.forEach((b) => {
      b.classList.remove(
        "active",
        "bg-primary",
        "text-white",
        "shadow-lg",
        "shadow-primary/25"
      );
      b.classList.add("text-slate-400");
    });
    // Add active class
    btn.classList.add(
      "active",
      "bg-primary",
      "text-white",
      "shadow-lg",
      "shadow-primary/25"
    );
    btn.classList.remove("text-slate-400");

    const filter = btn.getAttribute("data-filter");

    projects.forEach((project) => {
      if (
        filter === "all" ||
        project.getAttribute("data-category") === filter
      ) {
        project.style.display = "block";
        setTimeout(() => (project.style.opacity = "1"), 10);
      } else {
        project.style.opacity = "0";
        setTimeout(() => (project.style.display = "none"), 300);
      }
    });
  });
});
