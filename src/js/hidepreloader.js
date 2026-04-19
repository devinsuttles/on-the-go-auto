// Hide Preloader ------------
const preloader = document.getElementById("loader-wrapper");

document.addEventListener("DOMContentLoaded", function () {
  if (preloader) preloader.classList.add("hide-preloader");

  setTimeout(function () {
    if (preloader) preloader.hidden = true;
    if (preloader) preloader.style.display = "none";
  }, 600);
});
