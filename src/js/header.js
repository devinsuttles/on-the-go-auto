// Navigation
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("nav.nav-primary");
const body = document.querySelector("body");
const mainSections = document.querySelectorAll("main.entry-content section.section");

menuButton?.addEventListener("click", function () {
  navigation?.classList.toggle("show");
  menuButton.classList.toggle("activated");
  menuButton.classList.toggle("bx-x");

  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  menuButton.setAttribute("aria-pressed", String(!expanded));
});

const menuLinks = document.querySelectorAll(
  ".primary-menu .menu-item a, a.top-link, .site-title a"
);
menuLinks.forEach((eachLink) => {
  eachLink.addEventListener("click", function () {
    navigation?.classList.remove("show");
    menuButton?.classList.remove("activated");
    menuButton?.classList.remove("bx-x");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-pressed", "false");
  });
});

/* ## Scroll handlers — batched reads then writes, throttled with rAF
--------------------------------------------- */
let menuSection = document.querySelectorAll(".nav-primary li.menu-item a");

menuSection.forEach((v) => {
  v.onclick = () => {
    setTimeout(() => {
      menuSection.forEach((j) => j.classList.remove("active"));
      v.classList.add("active");
    }, 300);
  };
});

let scrollTicking = false;

window.addEventListener("scroll", () => {
  if (scrollTicking) return;
  scrollTicking = true;

  requestAnimationFrame(() => {
    // Batch all reads first
    const scrollY = window.scrollY;
    const rects = Array.from(mainSections).map((v) => v.getBoundingClientRect().y);

    // Then batch all writes
    if (scrollY >= 100) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }

    let activeIndex = -1;
    rects.forEach((rect, i) => {
      if (rect < 100) activeIndex = i;
    });

    if (activeIndex >= 0) {
      menuSection.forEach((v) => v.classList.remove("active"));
      menuSection[activeIndex].classList.add("active");
    }

    scrollTicking = false;
  });
}, { passive: true });
