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

// Navbar and Scroll Progress on Scroll
const navbar = document.getElementById("navbar");
const progressBar = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {
  // Navbar Toggling
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Scroll Progress Bar
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  const progressBar = document.getElementById("scroll-progress");
  if (progressBar) {
    progressBar.style.width = scrolled + "%";
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
    ".reveal, .edu-line-reveal, .edu-dot-reveal, .edu-card-left, .edu-card-right",
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
        "shadow-primary/25",
      );
      b.classList.add("text-slate-400");
    });
    // Add active class
    btn.classList.add(
      "active",
      "bg-primary",
      "text-white",
      "shadow-lg",
      "shadow-primary/25",
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

// Theme Toggle Logic
const themeToggleBtn = document.getElementById("theme-toggle");

// Initial Check
if (localStorage.getItem("color-theme") === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

// Event Listener
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    // Toggle Dark Class
    const isDark = document.documentElement.classList.toggle("dark");

    // Save preference
    if (isDark) {
      localStorage.setItem("color-theme", "dark");
    } else {
      localStorage.setItem("color-theme", "light");
    }
  });
}

// Zoho-style Scroll Interaction - Stacked Deck (Folder Look)
const pinSection = document.querySelector(".pin-section");
const cards = pinSection ? pinSection.querySelectorAll(".expertise-card") : [];

if (pinSection && cards.length > 0) {
  const handleScroll = () => {
    // 1. Get the pinned wrapper
    const pinWrapper = pinSection.querySelector(".pin-wrapper");
    if (!pinWrapper) return;

    // 2. Dimensions
    // With split layout, sticky starts when section top hits 0
    const sectionRect = pinSection.getBoundingClientRect();

    // Logic: scrolledPastStart = -sectionRect.top
    const scrolledPastStart = -sectionRect.top;

    // Track length = Total height of section - Height of wrapper (which stays fixed)
    const trackLength = pinSection.offsetHeight - pinWrapper.offsetHeight;

    // 3. Calculate Progress (0 to 1)
    let progress = 0;
    if (trackLength > 0) {
      progress = scrolledPastStart / trackLength;
    }
    progress = Math.max(0, Math.min(1, progress));

    // 4. Animate Cards
    cards.forEach((card, index) => {
      // Special handling for First Card: Always visible as the "base"
      if (index === 0) {
        card.style.opacity = 1;
        const stackOffset = 0;
        card.style.transform = `translateX(-50%) translateY(${stackOffset}px) scale(1)`;
        return;
      }

      // For other cards (1, 2, 3...), they slide in overlapping the previous ones.
      // We map the remaining progress (0 to 1) to these cards.
      const remainingCards = cards.length - 1;

      // Safety check
      if (remainingCards <= 0) return;

      const segmentSize = 1 / remainingCards;
      // Shift index by 1 since we skipped card 0
      const start = (index - 1) * segmentSize;
      const end = start + segmentSize;

      let cardProgress = (progress - start) / (end - start);
      cardProgress = Math.max(0, Math.min(1, cardProgress));

      const ease = 1 - Math.pow(1 - cardProgress, 3);
      const stackOffset = 0; // Cards stack directly on top of each other

      if (cardProgress <= 0) {
        card.style.transform = `translateX(-50%) translateY(120vh) scale(0.9)`;
        card.style.opacity = 0;
      } else if (cardProgress >= 1) {
        card.style.transform = `translateX(-50%) translateY(${stackOffset}px) scale(1)`;
        card.style.opacity = 1;
      } else {
        const startY = window.innerHeight;
        const endY = stackOffset;
        const currentY = startY - (startY - endY) * ease;
        const scale = 0.9 + 0.1 * ease;

        card.style.transform = `translateX(-50%) translateY(${currentY}px) scale(${scale})`;
        card.style.opacity = Math.min(1, cardProgress * 3);
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleScroll);
  // Initial call
  setTimeout(handleScroll, 100); // Slight delay to ensure layout is ready
  handleScroll();
}
