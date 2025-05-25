// Obținem elementele
const freqSlider = document.getElementById("frequency");
const speedSlider = document.getElementById("speed");
const freqVal = document.getElementById("freqVal");
const speedVal = document.getElementById("speedVal");
const wavelengthOutput = document.getElementById("wavelength");
const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

// Setăm dimensiunea canvasului
canvas.width = 800;
canvas.height = 200;

// Funcția de actualizare
function update() {
  const freq = parseFloat(freqSlider.value);
  const speed = parseFloat(speedSlider.value);
  const lambda = speed / freq;

  freqVal.textContent = freq;
  speedVal.textContent = speed;
  wavelengthOutput.textContent = lambda.toFixed(2);

  drawWave(lambda);
}

// Funcția care desenează unda
function drawWave(lambda) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);

  const amplitude = 40;

  for (let x = 0; x < canvas.width; x++) {
    const y = canvas.height / 2 + amplitude * Math.sin((2 * Math.PI * x) / lambda);
    ctx.lineTo(x, y);
  }

  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Ascultători pentru slider
freqSlider.addEventListener("input", update);
speedSlider.addEventListener("input", update);

// Inițializare
update();
