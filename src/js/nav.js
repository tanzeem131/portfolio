const nav = document.querySelector('.nav');
const headerSection = document.querySelector('.container');
const navCheck = document.getElementById('nav-check');
const navLinks = document.querySelectorAll('.nav-links a');

const initialCoordinates = headerSection.getBoundingClientRect();

window.addEventListener('scroll', function (e) {
  e.preventDefault();
  if (this.window.scrollY > initialCoordinates.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

document.addEventListener('DOMContentLoaded', function () {
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(function () {
        navCheck.checked = false;
      }, 300);
    });
  });
});

