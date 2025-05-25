const beam = document.getElementById('light-beam');
const rainbow = document.getElementById('rainbow');
let isDragging = false;

beam.addEventListener('mousedown', () => {
    isDragging = true;
    beam.style.cursor = 'grabbing';
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    beam.style.cursor = 'grab';
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const containerRect = beam.parentElement.getBoundingClientRect();
    let newX = e.clientX - containerRect.left - beam.offsetWidth / 2;

    // Limităm deplasarea fasciculului între 20 și 280 px (înainte de prismă)
    if (newX < 20) newX = 20;
    if (newX > 280) newX = 280;

    beam.style.left = newX + 'px';

    // Dacă fasciculul e aproape de prismă, afișăm curcubeul
    if (newX >= 260) {
        rainbow.style.opacity = '1';
    } else {
        rainbow.style.opacity = '0';
    }
});

function initColorTheory() {
    const container = document.getElementById("color-theory-container");
    container.classList.remove("run");
    void container.offsetWidth; // Force reflow
    container.classList.add("run");
}

let angleSlider, n1Slider, n2Slider;
let angleValueSpan, n1ValueSpan, n2ValueSpan;

function setup() {
  let cnv = createCanvas(600, 400);
  cnv.parent("canvas-container");

  angleSlider = select("#angleSlider");
  n1Slider = select("#n1Slider");
  n2Slider = select("#n2Slider");

  angleValueSpan = select("#angleValue");
  n1ValueSpan = select("#n1Value");
  n2ValueSpan = select("#n2Value");
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  // Actualizăm valorile din UI
  let angleDeg = angleSlider.value();
  let angleRad = radians(angleDeg);
  let n1 = parseFloat(n1Slider.value());
  let n2 = parseFloat(n2Slider.value());

  angleValueSpan.html(angleDeg);
  n1ValueSpan.html(n1.toFixed(2));
  n2ValueSpan.html(n2.toFixed(2));

  // Desenăm suprafața și normala
  stroke(0);
  strokeWeight(1);
  line(-width / 2, 0, width / 2, 0); // suprafață
  stroke(150);
  line(0, -height / 2, 0, height / 2); // normala

  // Raza incidentă (roșie)
  let incidentX = -200 * sin(angleRad);
  let incidentY = -200 * cos(angleRad);
  stroke('red');
  strokeWeight(2);
  line(incidentX, incidentY, 0, 0);

  // Raza reflectată (albastră)
  let reflectX = 200 * sin(angleRad);
  let reflectY = -200 * cos(angleRad);
  stroke('blue');
  line(0, 0, reflectX, reflectY);

  // Raza refractată (verde)
  let sinRefraction = (n1 / n2) * sin(angleRad);
  if (abs(sinRefraction) <= 1) {
    let angleRefracted = asin(sinRefraction);
    let refractX = 200 * sin(angleRefracted);
    let refractY = 200 * cos(angleRefracted);
    stroke('green');
    line(0, 0, refractX, refractY);
  } else {
    // Reflexie totală internă
    fill('black');
    noStroke();
    text("Reflexie totală!", 10, 20);
  }
}


//newton


