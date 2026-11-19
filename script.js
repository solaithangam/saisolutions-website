
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

const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const originalButtonText = submitButton.innerHTML;

  submitButton.disabled = true;
  submitButton.textContent = "Sending enquiry...";

  formNote.textContent = "Please wait while we submit your enquiry.";
  formNote.style.display = "block";

  try {
    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch(
      "https://api.web3forms.com/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    const result = await response.json();

    if (response.ok && result.success) {
      formNote.textContent =
        "Thank you! Your enquiry has been submitted successfully. We will get back to you within 1–2 business days.";

      formNote.style.color = "#16834a";
      contactForm.reset();
    } else {
      throw new Error(result.message || "Submission failed.");
    }

  } catch (error) {
    console.error("Contact form error:", error);

    formNote.textContent =
      "Sorry, we couldn't submit your enquiry. Please try again or contact us through WhatsApp.";

    formNote.style.color = "#c0392b";

  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
  }
});
