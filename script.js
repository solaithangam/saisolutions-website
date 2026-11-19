// Replace these two values before publishing.
const BUSINESS_EMAIL = "contact@sais.com";
const WHATSAPP_NUMBER = "919789550081"; // Country code + number, digits only.

document.getElementById("email-link").textContent = BUSINESS_EMAIL;
document.getElementById("email-link").href = `mailto:${BUSINESS_EMAIL}`;
const waLink = document.getElementById("whatsapp-link");
if (/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
  waLink.href = `https://wa.me/${WHATSAPP_NUMBER}`;
} else {
  waLink.href = "https://wa.me/";
}
document.getElementById("year").textContent = new Date().getFullYear();

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

document.getElementById("contact-form").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Website enquiry: ${data.get("service")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nService: ${data.get("service")}\n\nProject details:\n${data.get("message")}`
  );
  if (BUSINESS_EMAIL === "contact@sais.com") {
    document.getElementById("form-note").textContent =
      "Website setup required: replace YOUR_EMAIL@example.com in script.js with your business email before publishing.";
    return;
  }
  window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
});
