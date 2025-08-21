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
    (dayOfWeek !== "Saturday" && dayOfWeek !== "Sunday" && hours >= 8 && hours < 17);

  const outputTime = isOpeningHours
    ? '<span class="open text-success fw-bold">Open</span>!'
    : '<span class="closed text-danger fw-bold">Closed</span> see you tomorrow. 🙂';

  return `${outputDay}, We are ${outputTime}`;
}

function updateStatusRealtime() {
  document.getElementById("storestatus").innerHTML =
    `${storeStatus()}`;
}
updateStatusRealtime();
setInterval(updateStatusRealtime, 15000);

// Calendly Widget
function calendlyWidget() {
  const calendlyContainer = document.getElementById('calendly-widget');
  if (calendlyContainer) {
    // Create Calendly inline widget
    const calendlyDiv = document.createElement('div');
    calendlyDiv.className = 'calendly-inline-widget';
    calendlyDiv.setAttribute('data-url', 'https://calendly.com/swietonautomotive/service');
    calendlyDiv.style.minWidth = '320px';
    calendlyDiv.style.height = '700px';
    
    // Add the widget to the container
    calendlyContainer.appendChild(calendlyDiv);
    
    // Load Calendly script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
  }
}

// Initialize Calendly widget when DOM is loaded
document.addEventListener('DOMContentLoaded', calendlyWidget);