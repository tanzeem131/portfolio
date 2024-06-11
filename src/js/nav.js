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

let baseRotation = gsap.to(".rotating-img", {
  rotation: 360,
  duration: 2,
  ease: "none",
  repeat: -1
});

ScrollTrigger.create({
  trigger: ".fixed-img",
  start: "top top",
  end: "+=5000",
  scrub: 0.5,
  onUpdate: (self) => {
    const progress = self.progress;
    const scale = 1 - progress * 0.9;
    gsap.to(".rotating-img", {
      scale: scale,
      ease: "power1.inOut",
      overwrite: "none"
    });
  }
});


