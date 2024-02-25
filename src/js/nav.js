const nav = document.querySelector('.nav');
const headerSection = document.querySelector('.container');

const initialCoordinates = headerSection.getBoundingClientRect();

window.addEventListener('scroll', function (e) {
  e.preventDefault();
  if (this.window.scrollY > initialCoordinates.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
