// === Mobile nav toggle with open/close icon ===
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
const toggleIcon = navToggle.querySelector("i");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show-nav");

  // Toggle between bars and close icon
  if (navLinks.classList.contains("show-nav")) {
    toggleIcon.classList.remove("fa-bars");
    toggleIcon.classList.add("fa-xmark");
  } else {
    toggleIcon.classList.remove("fa-xmark");
    toggleIcon.classList.add("fa-bars");
  }
});

// === Typing Effect ===
const roles = ["Cyber Security Specialist", "Python Developer", "Graphic Designer", "UI/UX Designer"];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const dynamicText = document.getElementById("dynamic-text");

function typeEffect() {
  const currentRole = roles[roleIndex];
  const displayed = currentRole.substring(0, charIndex);
  dynamicText.textContent = displayed;

  const typingSpeed = isDeleting ? 50 : 85;

  if (!isDeleting && charIndex < currentRole.length) {
    charIndex++;
    setTimeout(typeEffect, typingSpeed);
  } 
  else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, typingSpeed - 20);
  } 
  else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
    } else {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 500);
    }
  }
}

typeEffect();



// === Falling Stars ===
const canvas = document.getElementById("star-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const numStars = 150;

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speed: Math.random() * 0.8 + 0.2
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(animateStars);
}

animateStars();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


// Typing effect setup

// === Multi-step Education/Experience/Certifications navigation ===
const sections = document.querySelectorAll(".section");
let currentIndex = 0;

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

function showSection(index) {
  sections.forEach((sec, i) => {
    sec.classList.toggle("active", i === index);
  });
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % sections.length;
  showSection(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + sections.length) % sections.length;
  showSection(currentIndex);
});
// === Animated Skill Counters ===
const counters = document.querySelectorAll(".counter");
let skillsAnimated = false;

function animateCounters() {
  if (skillsAnimated) return;
  skillsAnimated = true;

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = target / 100; // adjust speed here

    const updateCounter = () => {
      if (count < target) {
        count += increment;
        counter.textContent = Math.ceil(count);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

// Trigger animation on scroll into view
window.addEventListener("scroll", () => {
  const skillsSection = document.getElementById("skills");
  const sectionTop = skillsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight - 100) {
    animateCounters();
  }
});
// === Services Section Animation ===
const serviceCards = document.querySelectorAll(".service-card");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

// === Contact Form Handling with Formspree ===
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Simple validation
  if (!name || !email || !message) {
    alert("Please fill in all fields before submitting.");
    return;
  }

  // Prepare Formspree data
  const formData = new FormData(contactForm);

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    });

    if (response.ok) {
      // Clear form fields
      contactForm.reset();

      // Create and show success message
      showSuccessMessage("Your message has been sent successfully!");
    } else {
      showSuccessMessage("Oops! Something went wrong. Try again.", true);
    }
  } catch (error) {
    showSuccessMessage("Network error. Please try again later.", true);
  }
});

// Function to show styled success message
function showSuccessMessage(msg, isError = false) {
  // Remove existing message if any
  const existingMsg = document.querySelector(".form-feedback");
  if (existingMsg) existingMsg.remove();

  const feedback = document.createElement("div");
  feedback.className = "form-feedback";
  feedback.textContent = msg;
  feedback.style.padding = "1rem";
  feedback.style.marginTop = "1rem";
  feedback.style.borderRadius = "var(--radius)";
  feedback.style.textAlign = "center";
  feedback.style.fontWeight = "600";
  feedback.style.color = "#fff";
  feedback.style.backgroundColor = isError ? "rgba(255,0,0,0.7)" : "rgba(30,58,138,0.8)";
  feedback.style.boxShadow = "0 4px 15px rgba(0,0,0,0.5)";

  contactForm.appendChild(feedback);

  // Remove message after 5 seconds
  setTimeout(() => {
    feedback.remove();
  }, 5000);
}

// === About Section Animation ===
const aboutSection = document.querySelector("#about");
const aboutImage = document.querySelector(".about-image img");
const aboutText = document.querySelector(".about-content");

function revealAbout() {
  const rect = aboutSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.8) {
    aboutImage.style.transform = "scale(1)";
    aboutImage.style.opacity = "1";
    aboutText.style.opacity = "1";
    aboutText.style.transform = "translateY(0)";
    window.removeEventListener("scroll", revealAbout);
  }
}

aboutImage.style.transform = "scale(0.85)";
aboutImage.style.opacity = "0";
aboutText.style.opacity = "0";
aboutText.style.transform = "translateY(40px)";
aboutText.style.transition = "all 1s ease";
aboutImage.style.transition = "all 1.2s ease";

window.addEventListener("scroll", revealAbout);
// === Video Section Reveal ===
const videoSection = document.querySelector("#video-profile");
const videoEl = document.getElementById("profile-video");
const headerEl = document.querySelector(".video-header");

function revealVideoSection() {
  const rect = videoSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.8) {
    videoEl.style.opacity = "1";
    videoEl.style.transform = "scale(1)";
    headerEl.style.opacity = "1";
    headerEl.style.transform = "translateY(0)";
    window.removeEventListener("scroll", revealVideoSection);
  }
}

// initial hidden state
videoEl.style.opacity = "0";
videoEl.style.transform = "scale(0.9)";
videoEl.style.transition = "all 1s ease";
headerEl.style.opacity = "0";
headerEl.style.transform = "translateY(20px)";
headerEl.style.transition = "all 1s ease";

window.addEventListener("scroll", revealVideoSection);
// === Services Scroll Reveal (Fixed) ===
document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card");

  // Set initial hidden state
  serviceCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.8s ease";
  });

  // Reveal function
  function revealServices() {
    const triggerPoint = window.innerHeight * 0.85;

    serviceCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < triggerPoint) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    });
  }

  // Trigger on scroll and on page load
  window.addEventListener("scroll", revealServices);
  revealServices();
});
// Select all navigation buttons and project categories
const buttons = document.querySelectorAll(".project-btn");
const categories = document.querySelectorAll(".project-category");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    const target = document.getElementById(category);
    const activeCategory = document.querySelector(".project-category.active");

    // Skip if already active
    if (activeCategory === target) return;

    // Animate current category fade-out
    activeCategory.classList.add("fade-out");

    // Update active button styling
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Wait for fade-out to finish, then show new category
    setTimeout(() => {
      activeCategory.classList.remove("active", "fade-out");
      categories.forEach((c) => c.classList.remove("active"));
      target.classList.add("active", "fade-in");
    }, 300);

    // Clean up fade-in class after animation completes
    setTimeout(() => target.classList.remove("fade-in"), 800);
  });
});
// Footer Typing Effect
const footerText = [
  "Securing Digital Futures",
  "Code with Purpose",
  "Designing Safe Experiences",
  "Innovation in Every Click",
  "Cybersecurity, Development, Design"
];

const footerTyping = document.getElementById("footer-typing");
const cursor = document.querySelector(".footer-cursor");

let fIndex = 0;
let cIndex = 0;
let deleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let pause = 1500;

function typeFooterText() {
  const currentText = footerText[fIndex];
  
  if (!deleting) {
    footerTyping.textContent = currentText.substring(0, cIndex + 1);
    cIndex++;

    if (cIndex === currentText.length) {
      deleting = true;
      setTimeout(typeFooterText, pause);
      return;
    }
  } else {
    footerTyping.textContent = currentText.substring(0, cIndex - 1);
    cIndex--;

    if (cIndex === 0) {
      deleting = false;
      fIndex = (fIndex + 1) % footerText.length;
    }
  }

  setTimeout(typeFooterText, deleting ? deletingSpeed : typingSpeed);
}

// Start typing effect
document.addEventListener("DOMContentLoaded", typeFooterText);
