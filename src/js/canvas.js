document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('canvasbg');
  var ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  var particles = [];
  var particleCount = Math.min(20, (canvas.width * canvas.height) / 10000); // Adjust based on screen size
  var maxVelocity = 2;
  var targetFPS = 60;
  var connectDistance = 150;
  var lineColor = 'gray';
  var specialParticleColor = '#a9ff03';

  // Special particle
  var specialParticle = {
    currentTargetIndex: 0,
    x: 0,
    y: 0,
    speed: 3,
  };
  var endParticle = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    color: '#00ff00',
  };
  var path = [];

  function findPath() {
    // Reset current path
    path = [];

    var current = {
      x: specialParticle.x,
      y: specialParticle.y,
    };

    while (distance(current, endParticle) > connectDistance) {
      var closestDistance = Infinity;
      var closestParticle = null;

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var dist = distance(p, current);
        if (dist < closestDistance && dist <= connectDistance) {
          closestDistance = dist;
          closestParticle = p;
        }
      }

      if (closestParticle) {
        path.push(closestParticle);
        current = closestParticle;
      } else {
        break;
      }
    }

    path.push(endParticle); // Add end particle as final target
  }
  function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function createParticles() {
    for (var i = 0; i < particleCount; i++) {
      var x = Math.random() * canvas.width;
      var y = Math.random() * canvas.height;
      var velocityX = (Math.random() - 0.5) * maxVelocity;
      var velocityY = (Math.random() - 0.5) * maxVelocity;
      particles.push({ x: x, y: y, vx: velocityX, vy: velocityY });
    }
    specialParticle.x = particles[0].x;
    specialParticle.y = particles[0].y;
    specialParticle.currentTargetIndex = 0;
  }

  function findNextTarget() {
    var connectedParticles = [];
    var currentTarget = particles[specialParticle.currentTargetIndex];

    for (var i = 0; i < particles.length; i++) {
      if (i !== specialParticle.currentTargetIndex) {
        var p = particles[i];
        var distance = Math.sqrt(
          (p.x - currentTarget.x) ** 2 + (p.y - currentTarget.y) ** 2
        );
        if (distance < connectDistance) {
          connectedParticles.push(i);
        }
      }
    }

    if (connectedParticles.length > 0) {
      // Choose a random connected particle as the next target
      specialParticle.currentTargetIndex =
        connectedParticles[
          Math.floor(Math.random() * connectedParticles.length)
        ];
    }
  }

  function moveSpecialParticle() {
    var target = particles[specialParticle.currentTargetIndex];
    var dx = target.x - specialParticle.x;
    var dy = target.y - specialParticle.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 5) {
      findNextTarget();
    } else {
      var angle = Math.atan2(dy, dx);
      specialParticle.x += specialParticle.speed * Math.cos(angle);
      specialParticle.y += specialParticle.speed * Math.sin(angle);
    }
  }

  function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSpecialParticle();

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x > canvas.width) p.x = 0;
      if (p.x < 0) p.x = canvas.width;
      if (p.y > canvas.height) p.y = 0;
      if (p.y < 0) p.y = canvas.height;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(p.x, p.y, 4, 4);

      for (var j = 0; j < particles.length; j++) {
        if (i !== j) {
          var p2 = particles[j];
          var distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (distance < connectDistance) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    }

    // Draw the special particle
    ctx.fillStyle = specialParticleColor;
    ctx.beginPath();
    ctx.arc(specialParticle.x, specialParticle.y, 6, 0, 2 * Math.PI);
    ctx.fill();

    requestAnimationFrame(updateParticles);
  }

  createParticles();
  updateParticles();
});
