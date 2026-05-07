// Glide.js
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";

new Glide(".glide-deals", {
  type: "carousel",
  perView: 3,
  swipeThreshold: 40,
  dragThreshold: 60,
  animationDuration: 250,
  peek: 40,
  breakpoints: {
    992: {
      perView: 1,
    },
  },
}).mount();

new Glide(".glide-services", {
  type: "carousel",
  perView: 3,
  swipeThreshold: 40,
  dragThreshold: 60,
  animationDuration: 250,
  peek: 40,
  breakpoints: {
    // 992: {
    //   perView: 1,
    // },
    768: {
      perView: 1,
    },
  },
}).mount();

new Glide(".glide-reviews", {
  type: "carousel",
  perView: 3,
  swipeThreshold: 40,
  dragThreshold: 60,
  animationDuration: 250,
  breakpoints: {
    992: {
      perView: 2,
    },
    768: {
      perView: 1,
    },
  },
}).mount();
