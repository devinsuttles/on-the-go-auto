// Deals Slider Setup
const createDealsSlide = (icon, title, body) => ({
  icon: `<i class="bx ${icon}"></i>`,
  title,
  body,
});

// Setup Deals Slides
const dealsSlidesData = [
  createDealsSlide('bx-wind display-6', 'AC System Flush, Vacuum & Recharge Freon for $129.99!', 'Beat the heat with our top-notch service! Get an AC System Flush, Vacuum, and Recharge Freon for just $129.99.'),
  createDealsSlide('bxs-car-wash display-6', 'Synthetic Oil Change for just $99.99', 'Get your car running smoothly with our oil change specials! Synthetic oil change for $99.99 Quality service at great prices!'),
  createDealsSlide('bxs-car-wash display-6', 'Conventional Oil Change for just $69.99', 'Get your car running smoothly with our oil change specials! Conventional oil change for $69.99. Quality service at great prices!'),
  createDealsSlide('bx-stop-circle display-6', 'Brake Pads starting at just $129.99', 'Enhance your vehicle\'s safety with our limited-time brake pads deal! Expert replacements, special pricing. Act now, drive confidently!'),
  createDealsSlide('bxs-wrench display-6', 'Full Tune Up Starting from just $299.99', 'Tune up starting at just $299.99! Limited time offer. Optimize performance and reliability. Visit us today!'),
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
