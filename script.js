const loader = document.getElementById("loader");
const cursorGlow = document.getElementById("cursorGlow");
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const typedText = document.getElementById("typedText");
const downloadResume = document.getElementById("downloadResume");
const skillCards = document.querySelectorAll(".skill-card");
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hidden"), 450);

  if (window.AOS) {
    AOS.init({
      duration: 900,
      once: true,
      offset: 90,
      easing: "ease-out-cubic"
    });
  }

  if (window.particlesJS) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 72, density: { enable: true, value_area: 850 } },
        color: { value: ["#38bdf8", "#2563eb", "#ffffff"] },
        shape: { type: "circle" },
        opacity: { value: 0.38, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 145,
          color: "#38bdf8",
          opacity: 0.22,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.45,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 170, line_linked: { opacity: 0.42 } },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    });
  }
});

const typeMessage = "Diploma Robotics & Automation Student";
let typeIndex = 0;
let deleting = false;

function runTyping() {
  if (!typedText) return;

  if (!deleting) {
    typedText.textContent = typeMessage.slice(0, typeIndex + 1);
    typeIndex += 1;

    if (typeIndex === typeMessage.length) {
      deleting = true;
      setTimeout(runTyping, 1600);
      return;
    }
  } else {
    typedText.textContent = typeMessage.slice(0, typeIndex - 1);
    typeIndex -= 1;

    if (typeIndex === 0) {
      deleting = false;
    }
  }

  setTimeout(runTyping, deleting ? 42 : 72);
}

runTyping();

window.addEventListener("mousemove", (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
  backToTop.classList.toggle("visible", scrollTop > 520);

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 160 && rect.bottom >= 160) {
      navAnchors.forEach((anchor) => {
        anchor.classList.toggle("active", anchor.getAttribute("href") === `#${section.id}`);
      });
    }
  });
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
});

navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const bar = card.querySelector(".skill-bar span");
      bar.style.width = `${card.dataset.level}%`;
      skillObserver.unobserve(card);
    }
  });
}, { threshold: 0.45 });

skillCards.forEach((card) => skillObserver.observe(card));

document.querySelectorAll(".magnetic").forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});

downloadResume.addEventListener("click", (event) => {
  event.preventDefault();

  const resume = [
    "ATHARAVA KHAKALE",
    "Diploma Robotics & Automation Student",
    "",
    "ABOUT",
    "Robotics and AI enthusiast focused on practical engineering, automation, and intelligent systems.",
    "",
    "EDUCATION",
    "Class 10th - Podar International School - 70%",
    "Diploma - Vivekanand Education Society Polytechnic - 2024-2027",
    "",
    "SKILLS",
    "Microsoft Excel, Microsoft Word, PowerPoint, Fusion 360, Robotics, Automation, AI Basics",
    "",
    "COMPETITIONS",
    "Technothon, Robo Rumble, Circuit Debugging",
    "",
    "INTERESTS",
    "AI & Coding, Robotics, Gaming, Technology Innovation",
    "",
    "CONTACT",
    "Phone: +91 91377 69398",
    "Email: atharava.khakale1@gmail.com",
    "Address: Mumbai, Maharashtra, India"
  ].join("\n");

  const blob = new Blob([resume], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Atharava-Khakale-Resume.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});
