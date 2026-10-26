
"use strict";

// Set the earliest allowed travel date to today.
const travelDate = document.getElementById("travelDate");

function getLocalDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

travelDate.min = getLocalDateString();

// Select the destination in the booking modal.
document.querySelectorAll(".book-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById("destination").value =
      button.dataset.destination;
  });
});

// Reusable form validation.
function setupForm(formId, messageId, successText, customValidate) {
  const form = document.getElementById(formId);
  const message = document.getElementById(messageId);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    message.classList.add("d-none");
    form.classList.add("was-validated");

    // Native HTML validation checks required fields,
    // email format, and number limits.
    let valid = form.checkValidity();

    if (customValidate) {
      valid = customValidate() && valid;
    }

    if (!valid) {
      message.textContent = "Please correct the highlighted fields.";
      message.className = "alert alert-danger";
      return;
    }

    message.textContent = successText;
    message.className = "alert alert-success";

    // This is a front-end demo: no data is sent or stored.
    form.reset();
    form.classList.remove("was-validated");

    if (formId === "bookingForm") {
      travelDate.min = getLocalDateString();
    }
  });
}

// Booking enquiry validation.
setupForm(
  "bookingForm",
  "bookingMessage",
  "Your enquiry passed validation! This demo does not send it to an agency.",
  () => {
    const selectedDate = travelDate.value;
    const today = getLocalDateString();
    const travelers = Number(document.getElementById("travelers").value);

    const dateValid = selectedDate >= today;
    const travelersValid =
      Number.isInteger(travelers) && travelers >= 1 && travelers <= 20;

    travelDate.setCustomValidity(
      dateValid ? "" : "Please choose today or a future date."
    );

    document.getElementById("travelers").setCustomValidity(
      travelersValid ? "" : "Enter between 1 and 20 travelers."
    );

    return dateValid && travelersValid;
  }
);

// Contact form validation.
setupForm(
  "contactForm",
  "contactMessage",
  "Your message passed validation! Connect a backend to send it."
);
