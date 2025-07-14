// Function to create a counter box object
const createCounterBox = (id, number, text) => ({
  id,
  number,
  text,
});

// Setup WhyUs Counter Boxes
const counterBoxesData = [
  createCounterBox("business-counter", 5, "Years in Business"),
  createCounterBox("tires-counter", 650, "Tires Changed"),
  createCounterBox("wheels-counter", 2250, "Wheels Aligned"),
  createCounterBox("oil-counter", 5000, "Oils Changed"),
];

const counterBoxesHtml = counterBoxesData.map((cb) => {
  const id = cb.id ? cb.id : ``;
  const number = cb.number ? cb.number : ``;
  const text = cb.text ? cb.text : ``;
  const output =
    `<div id="${id}" class="counter-widget col-6 col-lg-3">
      <div class="shadow-sm rounded p-4 bg-secondary text-bg-secondary h-100 d-flex flex-column justify-content-center">
        <div class="counter-container">
          <div class="counter-head fs-3">
            <span class="counter-number">${number}</span>+
          </div>
        </div>
        <div>${text}</div>
      </div>
    </div>`;
  return output;
});
const counterBoxesElement = document.getElementById("counter-boxes");
if (counterBoxesElement) counterBoxesElement.innerHTML = counterBoxesHtml.join("");

// animate counters
const reasonCounter = document.querySelectorAll(`.counter-number`);
reasonCounter.forEach(reason => {
  if (reason) countWhenVisible(reason, reason.innerHTML, 1000);
})
function countWhenVisible(element, targetCount, speed) {
  let hasCounted = false;
  let startTime = null;
  let observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasCounted) {
      hasCounted = true;
      startTime = performance.now();
      let count = 0;
      let duration = speed;
      let interval = setInterval(() => {
        let elapsedTime = performance.now() - startTime;
        let progress = elapsedTime / duration;
        if (progress >= 1) {
          clearInterval(interval);
          element.innerHTML = targetCount;
        } else {
          count = Math.floor(progress * targetCount);
          element.innerHTML = count;
        }
      }, 20);
    }
  });
  if (element) observer.observe(element);
}

// Function to create a counter box object
const createReasonBox = (title, body) => ({
  title,
  body,
});

// Setup WhyUs Counter Boxes
const reasonBoxesData = [
  createReasonBox(`Unmatched Expertise`, `At Car Club Tire & Auto Repair Service, our team of highly skilled and certified technicians brings years of experience and expertise to the table. You can trust us to handle your vehicle with precision and care, ensuring top-notch repairs and maintenance.`),
  createReasonBox(`Customer-Centric Approach`, `We prioritize your satisfaction and go the extra mile to provide personalized attention to every customer. Our friendly and approachable team is always ready to listen to your concerns and offer tailored solutions that suit your specific needs.`),
  createReasonBox(`Wide Range of Services`, `From tire work and maintenance to comprehensive auto repairs, we offer a diverse range of services under one roof. Whether it's routine maintenance or complex repairs, we've got you covered, saving you time and hassle.`),
  createCounterBox(`Quality and Reliability`, `We are committed to using top-quality parts and materials in all our services. Our emphasis on reliability ensures that your vehicle receives the best possible care, enhancing its performance and longevity.`),
  createCounterBox(`Transparent Pricing`, `At Car Club, we believe in transparent and fair pricing. You can count on us to provide honest estimates and no hidden fees, allowing you to make informed decisions without any surprises.`),
  createCounterBox(`Swift Turnaround`, `We understand that your time is valuable, which is why we strive to deliver efficient and timely service. Our team works diligently to get you back on the road as quickly as possible, without compromising on quality.`),
];

const reasonBoxesHtml = reasonBoxesData.map((rs) => {
  const title = rs.title ? rs.title : ``;
  const body = rs.body ? rs.body : ``;
  const output =
    `<div class="col-lg-4 col-6 col-12">
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <div class="fs-5 text-primary fw-medium card-title">${title}</div>
          ${body}
        </div>
      </div>
    </div>`;
  return output;
});
const reasaonBoxesElement = document.getElementById("reason-boxes");
if (reasaonBoxesElement) reasaonBoxesElement.innerHTML = reasonBoxesHtml.join("");