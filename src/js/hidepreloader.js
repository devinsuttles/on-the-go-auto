// Hide Preloader ------------
const preloader = document.getElementById("loader-wrapper");

window.onload = function () {
  if (preloader) preloader.classList.add("hide-preloader");

  setTimeout(function () {
    if (preloader) preloader.hidden = true;
    if (preloader) preloader.style.display = "none";
  }, 2000);
};
