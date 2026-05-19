// Hide Preloader ------------
const preloader = document.getElementById("loader-wrapper");

function hidePreloader() {
  if (preloader) preloader.classList.add("hide-preloader");

  setTimeout(function () {
    if (preloader) preloader.hidden = true;
    if (preloader) preloader.style.display = "none";
  }, 600);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", hidePreloader);
} else {
  hidePreloader();
}
