// Setup Alert Boxes
const alertBoxesData = [
  {
    body: `Special Discounts for Veterans & Military Personel, Students, and Senior Citizens.`,
  },
  {
    body: 'We offer competive pricing.',
  },
];

const alertBoxHtml = alertBoxesData.map((bx) => {
  const body = bx.body ? bx.body : ``
  return `<li>${body}</li>`
});

const alertBoxesElement = document.querySelector("#alert-boxes .card-body");

if (alertBoxesElement) 
{
  alertBoxesElement.innerHTML = alertBoxHtml.join("");
}

// Setup Deals Slides
const dealsSlidesData = [
  {
    icon: `<i class="icon bx bx-wind display-6"></i>`,
    title: `AC System Flush, Vacuum & Recharge Freon for $129.99!`,
    body: `Beat the heat with our top-notch service! Get an AC System Flush, Vacuum, and Recharge Freon for just $129.99.`,
  },
  {
    icon: `<i class="icon bx bxs-car-wash display-6"></i>`,
    title: `Synthetic Oil Change for just $99.99`,
    body: `Get your car running smoothly with our oil change specials! Synthetic oil change for $99.99 Quality service at great prices!`,
  },
  {
    icon: `<i class="icon bx bxs-car-wash display-6"></i>`,
    title: `Conventional Oil Change for just $69.99`,
    body: `Get your car running smoothly with our oil change specials! Conventional oil change for $69.99. Quality service at great prices!`,
  },
  {
    icon: `<i class="icon bx bx-stop-circle display-6"></i>`,
    title: `Brake Pads starting at just $129.99`,
    body: `Enhance your vehicle's safety with our limited-time brake pads deal! Expert replacements, special pricing. Act now, drive confidently!`,
  },
  {
    icon: `<i class="icon bx bxs-wrench display-6"></i>`,
    title: `Full Tune Up Starting from just $299.99`,
    body: `Tune up starting at just $299.99! Limited time offer. Optimize performance and reliability. Visit us today!`,
  },
  {
    icon: `<i class="icon bx bxs-car-garage display-6"></i>`,
    title: `Heat not working? Check engine light on?`,
    body: `Get a comprhensive inspection for $119.99 from our expert technicians and drive with confidence!`,
  }
];

const dealsSlidesHtml = dealsSlidesData.map((sl) => {
  const output =
    `<li class="glide__slide h-auto">`+
      `<div class="ag-courses_item h-100 bg-primary p-3 text-light rounded">`+
        `<div class="ag-courses-item_bg"></div>`+
        `<div class="ag-courses-item_title fs-5 fw-medium mb-2">`+
          `<div>${sl.icon}</div>`+
          `<div>${sl.title}</div>`+
        `</div>`+
        `<div class="ag-course-body">${sl.body}</div>`+
      `</div>`+
    `</li>`
  return output
});

const dealsSlidesElement = document.getElementById("deals-slides")

if (dealsSlidesElement) 
{
  dealsSlidesElement.innerHTML = dealsSlidesHtml.join("");
}
