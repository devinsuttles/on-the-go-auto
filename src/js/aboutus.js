// Setup Services Slides
const serviceSlidesData = [
  {
    icon: `<i class="bx bxs-car-mechanic"></i>`,
    title: `Patch & Plug`,
    body: `Our professional tire patching service restores damaged tires to safe conditions, saving you from the cost of replacement.`,
  },
  {
    icon: `<i class="bx bxs-car-mechanic"></i>`,
    title: `A/C Recharge & Dye`,
    body: `Stay cool during hot days with our A/C recharge service using the best refrigerant and dye for leak detection.`,
  },
  {
    icon: `<i class="bx bxs-car-mechanic"></i>`,
    title: `Oil Change & Filter`,
    body: `Keep your engine running smoothly and efficiently with our oil change service, including a new filter installation.`,
  },
  {
    icon: `<i class="bx bxs-car-mechanic"></i>`,
    title: `Front & Rear Brake Pads`,
    body: `Ensure reliable stopping power with our front and rear brake pad replacement, using top-quality brake pads for safety and performance.`,
  },
  {
    icon: `<i class="bx bxs-car-mechanic"></i>`,
    title: `New Battery`,
    body: `If it's time for a new battery, trust our experts to install a reliable and durable replacement for your vehicle.`,
  },
  {
    icon: `<i class="bx bxs-car-mechanic"></i>`,
    title: `Wiper Blades`,
    body: `Improve visibility during rain or snow with new wiper blades that fit your vehicle perfectly.`,
  },
  {
    icon: `<i class="bx bxs-car-mechanic"></i>`,
    title: `Cabin Air Filters`,
    body: `Breathe clean air inside your car with our cabin air filter replacement service.`,
  },
  {
    icon: `<i class="bx bxs-car-mechanic"></i>`,
    title: `Suspension & Steering`,
    body: `Experience smoother rides and enhanced handling with our expert suspension and steering services with us. Drive with confidence.`,
  },
  {
    icon: `<i class="bx bxs-car-mechanic"></i>`,
    title: `Exhaust System repairing`,
    body: `Experience smoother rides and enhanced handling with expert suspension and steering services. visit us today!`,
  },
  {
    icon: `<i class="bx bxs-car-mechanic"></i>`,
    title: `Car electrical system repairs`,
    body: `For reliable car electrical system repairs, trust our experienced technicians. Drive worry-free with our top-notch service.`,
  },
  {
    icon: `<i class="bx bxs-car-mechanic"></i>`,
    title: `Check engine light diagnosis`,
    body: `Is your check engine light on? Don't worry! Our skilled technicians specialize in check engine light diagnosis.`,
  },
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
if (slideBoxesElement) slideBoxesElement.innerHTML = slideBoxesHtml.join("");
