 // (switch case сделать)
let socialLinks = document.querySelector('.footer__socialLinks');
socialLinks.addEventListener('click', (e) => {
  if (e.target.className == 'twIcon')
    document.location.href =
      'https://ru.wikipedia.org/wiki/%D0%A2%D0%B2%D0%B8%D1%82%D1%82%D0%B5%D1%80';
  if (e.target.className == 'catIcon')
    document.location.href = 'https://ru.wikipedia.org/wiki/Koska';
  if (e.target.className == 'fIcon')
    document.location.href = 'https://ru.wikipedia.org/wiki/Facebook';
  if (e.target.className == 'inIcon')
    document.location.href = 'https://en.wikipedia.org/wiki/Main_Page';
});

let homeButton = document.querySelector('.column__text_red');
homeButton.addEventListener('click', () => {
  document.documentElement.scrollIntoView({
    behavior: 'smooth',
  });
});


// прокрутка
const slider = document.querySelector('.carousel-slider');
const slider_buttons = document.querySelector('.buttons');
const prevBtn = document.querySelector('.button__white_left');
const arrowLeft = document.querySelector('.button__vector_left');
const nextBtn = document.querySelector('.button__red_right');
const arrowRight = document.querySelector('.button__vector_right');

slider_buttons.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target === prevBtn || e.target === arrowLeft) slider.scrollBy({left: -slider.offsetWidth, top: 0, behavior : "smooth"});
  if (e.target === nextBtn || e.target === arrowRight) slider.scrollBy({left: slider.offsetWidth, top: 0, behavior : "smooth"});
});

// likes
let likeButtons = document.querySelectorAll('.rate__option_like');

likeButtons.forEach(item => {
  item.addEventListener('click', () => item.classList.toggle('rate__option_likeRed'));
})
