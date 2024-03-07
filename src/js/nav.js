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

var tl = gsap.timeline();

tl.from('.logo', {
  y: 50,
  duration: 0.2,
  delay: 0.2,
  opacity: 0,
  stagger: 0.2,
  rotate: 100,
});
tl.from('#nav-home', {
  y: -20,
  duration: 0.2,
  delay: 0.2,
  opacity: 0,
  stagger: 0.2,
});
tl.from('#nav-about', {
  y: 50,
  duration: 0.2,
  delay: 0.2,
  opacity: 0,
  stagger: 0.2,
});
tl.from('#nav-skills', {
  y: -20,
  duration: 0.2,
  delay: 0.2,
  opacity: 0,
  stagger: 0.2,
});
tl.from('#nav-projects', {
  y: 50,
  duration: 0.2,
  delay: 0.2,
  opacity: 0,
  stagger: 0.2,
});
tl.from('#nav-contact', {
  y: -20,
  duration: 0.2,
  delay: 0.2,
  opacity: 0,
  stagger: 0.2,
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
