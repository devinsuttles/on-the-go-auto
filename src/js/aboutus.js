// Function to create a service slide object
const createServiceSlide = (icon, title, body) => ({
  icon: `<i class="bx ${icon}"></i>`,
  title,
  body,
});

// Setup Services Slides
const serviceSlidesData = [
  createServiceSlide('bxs-car-mechanic', 'A/C Recharge & Dye', 'Stay cool during hot days with our A/C recharge service using the best refrigerant and dye for leak detection.'),
  createServiceSlide('bxs-car-mechanic', 'Oil Change & Filter', 'Keep your engine running smoothly and efficiently with our oil change service, including a new filter installation.'),
  createServiceSlide('bxs-car-mechanic', 'Front & Rear Brake Pads', 'Ensure reliable stopping power with our front and rear brake pad replacement, using top-quality brake pads for safety and performance.'),
  createServiceSlide('bxs-car-mechanic', 'New Battery', 'If it\'s time for a new battery, trust our experts to install a reliable and durable replacement for your vehicle.'),
  createServiceSlide('bxs-car-mechanic', 'Wiper Blades', 'Improve visibility during rain or snow with new wiper blades that fit your vehicle perfectly.'),
  createServiceSlide('bxs-car-mechanic', 'Cabin Air Filters', 'Breathe clean air inside your car with our cabin air filter replacement service.'),
  createServiceSlide('bxs-car-mechanic', 'Suspension & Steering', 'Experience smoother rides and enhanced handling with our expert suspension and steering services. Drive with confidence.'),
  createServiceSlide('bxs-car-mechanic', 'Exhaust System Repairing', 'Get your exhaust system repaired by our experts for a smoother and quieter ride. Visit us today!'),
];

const slideBoxesHtml = serviceSlidesData.map((sl) => {
  const body = sl.body ? sl.body : ``;
  const icon = sl.icon ? sl.icon : ``;
  const title = sl.title ? sl.title : ``;
  const output =
    `<li class="glide__slide h-auto">
      <div class="card h-100">
        <div class="card-body">
          <div class="card-title text-primary fw-medium fs-5">${icon} ${title}</div>
          ${body}
        </div>
      </div>
    </li>`;
  return output;
});

const slideBoxesElement = document.getElementById("service-slides");

if (slideBoxesElement) 
  slideBoxesElement.innerHTML = slideBoxesHtml.join("");
