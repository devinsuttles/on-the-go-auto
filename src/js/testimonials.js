// Setup Alert Boxes
const alertBoxesData = [
  {
    url: `https://www.facebook.com/profile.php?id=61563832693551&sk=reviews`,
    img: false,
    name: `Jacqueline Winne`,
    body: `Absolutely love On the Go auto! Aaron and John are very professional, helpful & kind! They make it easy to schedule in vehicle maintenance & work!`,
  },
  {
    url: `https://www.facebook.com/profile.php?id=61563832693551&sk=reviews`,
    img: false,
    name: `Dylan Brady`,
    body: `One of the best dudes you will find, they have personally worked on my car, gave me peace of mind and told me to relax and I got to skip the scary idea of a mechanic not caring about my car, they treat you like family.`,
  },
  {
    url: 'https://www.facebook.com/profile.php?id=100095312300533&sk=reviews',
    img: false,
    name: 'Jamie A Barrett',
    body: 'Responded quickly and was able to work on my car almost immediately. Aaron diagnosed the issue with my car and resolved it. I will be reaching out to him again in the future!',
  }
]

const aletBoxHtml = alertBoxesData.map((rv) => {
  const avatar = rv.img
    ? `<img decoding="async" loading="lazy" width="26" height="26" src="${rv.img}" alt="Google Reviewer's Photo">`
    : `<i class='bx bx-user p-1 border rounded-circle'></i>`
  const url = rv.url ? rv.url : ``
  const name = rv.name ? rv.name : ``
  const body = rv.body ? rv.body : ``

  const output =
  `<li class="glide__slide h-auto">`+
      `<figure class="h-100">`+
        `<figcaption class="text-center text-md-start mb-2 fw-medium">`+
          `<a href="${url}" title="5 star Google Review" target="_blank" rel="nofollow">`+
            `${avatar} ${name} &#8212; <i class="bx bxl-google"></i> <i class="bx bx-map-alt"></i>`+
          `</a>`+
        `</figcaption>`+
        `<div class="star-ratings mb-2 text-center text-md-start">`+
          `<i class="bxs-star bx"></i>`+
          `<i class="bxs-star bx"></i>`+
          `<i class="bxs-star bx"></i>`+
          `<i class="bxs-star bx"></i>`+
          `<i class="bxs-star bx"></i>`+
        `</div>`+
        `<blockquote class="blockquote">"${body}"</blockquote>`+
      `</figure>`+
    `</li>`

  return output;
});

const aletBoxesElement = document.getElementById(`review-slides`)
if (aletBoxesElement) aletBoxesElement.innerHTML = aletBoxHtml.join(``)
