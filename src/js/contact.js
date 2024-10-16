// // Store status
function storeStatus() {
  const timeZone = "America/Chicago";
  const now = new Date();
  const localTime = new Date(
    now.toLocaleString("en-US", {
      timeZone: timeZone
    })
  );
  // Days ---------------------------
  const options = { weekday: "long" };
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: timeZone,
  });
  const orangeCityDayToday = new Intl.DateTimeFormat("en-US", options).format(localTime);
  const outputDay = `${orangeCityDayToday} ${formattedTime}`;

  // Time --------------------------
  const hours = localTime.getHours();
  const dayOfWeek = localTime.toLocaleString("en-US", {
    timeZone,
    weekday: "long",
  });
  const isOpeningHours =
    (dayOfWeek === "Sunday" && hours >= 9 && hours < 17) ||
    (dayOfWeek !== "Sunday" && hours >= 8 && hours < 17);

  const outputTime = isOpeningHours
    ? '<span class="open text-success fw-bold">Open</span> come on down'
    : '<span class="closed text-danger fw-bold">Closed</span> see you tomorrow. 🙂';

  return `${outputDay}, We are ${outputTime}`;
}

function updateStatusRealtime() {
  document.getElementById("storestatus").innerHTML =
    `${storeStatus()}`;
}
updateStatusRealtime();
setInterval(updateStatusRealtime, 15000);



// JavaScript form submission
import "bootstrap/js/dist/alert.js";
const formId = 'homepage-contact-form';
const contactForm = document.getElementById(formId);
if (contactForm) {

  const nameInput = document.querySelector('#' + formId + ' #contact-form-name');
  const emailInput = document.querySelector('#' + formId + ' #contact-form-email');
  const messageInput = document.querySelector('#' + formId + ' #contact-form-message');
  // const button = document.querySelector('#' + formId + ' #form-submit-button');

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // Error Alerts
  const alertPlaceholder = document.querySelector('#' + formId + ' #errorAlerts');
  const appendAlert = message => {
    alertPlaceholder.innerHTML = [
      `<div class="alert alert-danger alert-dismissible" role="alert">`,
      `<div>${message}</div>`,
      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  }

  const validateForm = () => {
    if (nameInput.value.trim() === '') {
      appendAlert('Please enter your name');
      return false;
    }
    if (emailInput.value.trim() === '' || !validateEmail(emailInput.value)) {
      // alert('Please enter a valid email address.');
      appendAlert('Please enter a valid email address.');
      return false;
    }
    if (messageInput.value.trim() === '') {
      appendAlert('Please enter a message.');
      return false;
    }
    return true;
  }

  contactForm.addEventListener("submit", function (event) {
    // Prevent default form submission
    event.preventDefault();

    // Remove previous alerts
    const alertDismiss = this.querySelectorAll('#' + formId + ' #errorAlerts > *');
    if (alertDismiss) {
      alertDismiss.forEach(e => {
        e.remove();
      });
    };

    if (!validateForm()) {
      return false;
    }

    else {
      const receiveEmail = "swietonautomotive@gmail.com";
      // Compose email message
      const subject = `[Contact-Form] ${nameInput.value}`;
      const body = `${messageInput.value}\n\n${nameInput.value}\n${emailInput.value}`;
      // Open default email app and fill in appropriate fields
      const mailtoUrl = `mailto:${encodeURIComponent(
        receiveEmail
      )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      // Open Email client on click
      window.open(mailtoUrl);
    }
  });
}