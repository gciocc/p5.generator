let PePERLIN_SCALE = 50;
function setup() {
  createCanvas(200, 200);
  background(0);
  noStroke();

  let centerX = width / 2;
  let centerY = height / 2;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      fill(x, y, 0);
      rect(x, y, 1, 1);
      console.log(x, y);

      // Calcolo distanza dal centro
      let distanceFromCenter = dist(centerX, centerY, x, y);
      let normDistanceFromCenter = distanceFromCenter / (width / 2); // 0-1
      
      // Calcolo altitudine
      let altitude = 1 - normDistanceFromCenter; // 1 al centro, 0 ai bordi

      // Perlin
      noiseDetail(6); // Dettaglio del rumore
      let perlin = noise(x / PePERLIN_SCALE, y / PePERLIN_SCALE); // Scala per variare la frequenza
      altitude *= perlin;

      // Assegniamo il colore
      let sealevel = 0.2; // Soglia per il livello del mare
      let beachLevel = 0.25; // Soglia per la spiaggia
       if (altitude < sealevel) {
        fill(0, 0, 255); // Terra
      } else if (altitude < beachLevel) {
        fill(255, 255, 0); // Spiaggia
      } else {
        fill(0, 255, 0); // Acqua
      }
      

      rect(x, y, 1, 1);
     }
  }
}