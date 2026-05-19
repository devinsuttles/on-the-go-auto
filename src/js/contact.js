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

// Calendly Widget — lazy-loaded only when user scrolls near the section
function loadCalendlyWidget(container) {
  const calendlyDiv = document.createElement('div');
  calendlyDiv.className = 'calendly-inline-widget';
  calendlyDiv.setAttribute('data-url', 'https://calendly.com/swietonautomotive/service');
  calendlyDiv.style.minWidth = '320px';
  calendlyDiv.style.height = '700px';
  container.appendChild(calendlyDiv);

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://assets.calendly.com/assets/external/widget.js';
  script.async = true;
  document.head.appendChild(script);
}

function initCalendlyObserver() {
  const container = document.getElementById('calendly-widget');
  if (!container) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      if (entries[0].isIntersecting) {
        obs.disconnect();
        loadCalendlyWidget(container);
      }
    },
    { rootMargin: '200px' }
  );
  observer.observe(container);
}

document.addEventListener('DOMContentLoaded', initCalendlyObserver);