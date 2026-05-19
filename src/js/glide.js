// Glide.js
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";

function initializeCarousels() {
  try {
    const dealsSlides = document.getElementById("deals-slides");
    if (dealsSlides && dealsSlides.children.length > 0) {
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

    const serviceSlides = document.getElementById("service-slides");
    if (serviceSlides && serviceSlides.children.length > 0) {
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

    const reviewSlides = document.getElementById("review-slides");
    if (reviewSlides && reviewSlides.children.length > 0) {
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

function waitForSlidesAndInitialize() {
  const checkAndInit = () => {
    const dealsSlides = document.getElementById("deals-slides");
    const serviceSlides = document.getElementById("service-slides");
    const reviewSlides = document.getElementById("review-slides");

    const allSlidesReady =
      (dealsSlides && dealsSlides.children.length > 0) &&
      (serviceSlides && serviceSlides.children.length > 0) &&
      (reviewSlides && reviewSlides.children.length > 0);

    if (allSlidesReady) {
      initializeCarousels();
    } else {
      requestAnimationFrame(checkAndInit);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      requestAnimationFrame(checkAndInit);
    });
  } else {
    requestAnimationFrame(checkAndInit);
  }
}

waitForSlidesAndInitialize();
