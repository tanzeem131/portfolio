const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = 550;

const c = canvas.getContext('2d');

// Set the number of stars to draw
let stars = [];
let numStars = 100;
let speed = 10;

// Reset a star
function makeStar() {
  return {
    x: Math.random(),
    y: Math.random(),
    distance: Math.sqrt(Math.random()),
    color:
      'hsl(' + Math.random() * 40 + ',100%,' + (70 + Math.random() * 30) + '%)',
  };
}

// Initialise stars
for (i = 0; i < numStars; i++) {
  stars[i] = makeStar();
}

// Draw stars
function updateStars() {
  // Clear canvas
  c.clearRect(0, 0, canvas.width, canvas.height);
  // Draw each star
  for (i = 0; i < numStars; i++) {
    // Move the star first
    stars[i].x -= (Math.pow(stars[i].distance, 2) / canvas.width) * speed;
    // If it's off-screen, reset it
    if (stars[i].x <= 0) {
      stars[i] = makeStar();
      stars[i].x = 1;
    }
    // Draw the star
    c.beginPath();
    c.arc(
      stars[i].x * canvas.width,
      stars[i].y * canvas.height,
      stars[i].distance * 2,
      0,
      2 * Math.PI,
      false
    );
    c.lineWidth = stars[i].distance * 4;
    c.strokeStyle = 'rgba(255,255,255,1)';
    c.stroke();
    c.fillStyle = stars[i].color;
    c.fill();
  }
}

// Redraw the stars every 30 milliseconds
setInterval(function () {
  updateStars();
}, 30);
