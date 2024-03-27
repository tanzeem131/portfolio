import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const nav = document.querySelector('.nav');
const headerSection = document.querySelector('.container');
const initialCoordinates = headerSection.getBoundingClientRect();

window.addEventListener('scroll', function (e) {
  e.preventDefault();
  if (this.window.scrollY > initialCoordinates.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

gsap.to('.rotating-img', { rotation: 1440, duration: 360 });
gsap.to('.rotating-img', {
  scrollTrigger: {
    trigger: '.fixed-img',
    scrub: 1,
    start: 'center center',
    end: '+=5000',
  },
  rotation: 1440,
  duration: 1,
  ease: 'none',
});
