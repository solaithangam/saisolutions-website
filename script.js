
const BUSINESS_EMAIL = "solaithangam.ai@gmail.com";
const WHATSAPP_NUMBER = "919789550081";

// Configure email link
document.getElementById("email-link").textContent = BUSINESS_EMAIL;
document.getElementById("email-link").href = `mailto:${BUSINESS_EMAIL}`;

// Configure WhatsApp link
const waLink = document.getElementById("whatsapp-link");

if (/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
  waLink.href = `https://wa.me/${WHATSAPP_NUMBER}`;
} else {
  waLink.href = "https://wa.me/";
}

document.getElementById("year").textContent = new Date().getFullYear();

// Mobile navigation
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

// Contact form
document.getElementById("contact-form").addEventListener("submit", event => {
  event.preventDefault();

  const data = new FormData(event.currentTarget);

  const subject = encodeURIComponent(
    `Website enquiry: ${data.get("service")}`
  );

  const body = encodeURIComponent(
    `Name: ${data.get("name")}\n` +
    `Email: ${data.get("email")}\n` +
    `Service: ${data.get("service")}\n\n` +
    `Project details:\n${data.get("message")}`
  );

  if (!BUSINESS_EMAIL || BUSINESS_EMAIL === "YOUR_EMAIL@example.com") {
    document.getElementById("form-note").textContent =
      "Please configure the business email address in script.js.";
    return;
  }

  window.location.href =
    `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
});
