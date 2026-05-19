// Glide.js
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";

function initializeCarousels() {
  try {
    if (document.querySelector(".glide-deals")) {
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
    }

    if (document.querySelector(".glide-services")) {
      new Glide(".glide-services", {
        type: "carousel",
        perView: 3,
        swipeThreshold: 40,
        dragThreshold: 60,
        animationDuration: 250,
        peek: 40,
        breakpoints: {
          768: {
            perView: 1,
          },
        },
      }).mount();
    }

    if (document.querySelector(".glide-reviews")) {
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
    }
  } catch (error) {
    console.error("Error initializing Glide carousels:", error);
  }
}

// Ensure initialization happens after DOM is ready and after all other modules have executed
function scheduleCarouselInit() {
  const runInit = () => {
    // Use requestAnimationFrame twice to ensure proper timing
    requestAnimationFrame(() => {
      requestAnimationFrame(initializeCarousels);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runInit);
  } else {
    // If DOM is already loaded, schedule with microtasks to let other modules finish
    Promise.resolve().then(runInit);
  }
}

scheduleCarouselInit();
