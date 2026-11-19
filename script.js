
const BUSINESS_EMAIL = "solaithangam.ai@gmail.com";
const WHATSAPP_NUMBER = "919789550081";

const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzvqFFZjxmJlEfOOEve90Tlizu7KOx9U_w02-TQ9VtulwTZ0xha38rqGzIx1ZyI-jU/exec";

// Configure email link
const emailLink = document.getElementById("email-link");

if (emailLink) {
  emailLink.textContent = BUSINESS_EMAIL;
  emailLink.href = `mailto:${BUSINESS_EMAIL}`;
}

// Configure WhatsApp link
const waLink = document.getElementById("whatsapp-link");

if (waLink) {
  if (/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    waLink.href = `https://wa.me/${WHATSAPP_NUMBER}`;
  } else {
    waLink.href = "https://wa.me/";
  }
}

// Dynamic copyright year
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Mobile navigation
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

// Contact form
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

if (contactForm && formNote) {
  const submitButton = contactForm.querySelector(
    'button[type="submit"]'
  );

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const originalButtonText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.textContent = "Sending enquiry...";

    formNote.textContent =
      "Please wait while we submit your enquiry.";

    formNote.style.display = "block";

    try {
      const formData = new FormData(contactForm);
      const payload = Object.fromEntries(formData.entries());

      // Step 1: Submit enquiry through Web3Forms
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

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Web3Forms submission failed."
        );
      }

      // Step 2: Send customer acknowledgement through Google Apps Script
      const autoReplyPayload = {
        customerName: payload.name || "",
        customerEmail: payload.email || "",
        service: payload.service || "General Enquiry",
        message: payload.message || "",
        website: ""
      };

      try {
        await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=UTF-8"
          },
          body: JSON.stringify(autoReplyPayload)
        });

        console.log(
          "Customer acknowledgement request dispatched."
        );

      } catch (autoReplyError) {
        console.error(
          "Customer acknowledgement request failed:",
          autoReplyError
        );
      }

      // Step 3: Display website confirmation
      formNote.textContent =
        "Thank you! Your enquiry has been submitted successfully. We will get back to you within 1–2 business days.";

      formNote.style.color = "#16834a";

      contactForm.reset();

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
}
