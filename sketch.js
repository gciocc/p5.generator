let PePERLIN_SCALE = 200;
let TITLE_SIZE = 32;

let grassImage;
let sandImage;
let waterImage;

function preload() {
  grassImage = loadImage("tiles/prato.png");
  sandImage = loadImage("tiles/sabbia.png");
  waterImage = loadImage("tiles/acqua.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();

  let centerX = width / 2;
  let centerY = height / 2;

  for (let x = 0; x < width; x = x + TITLE_SIZE) {
    for (let y = 0; y < height; y = y + TITLE_SIZE) {
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
      altitude += perlin;
      altitude -= 0.5;;

      // Assegniamo il colore
      let sealevel = 0.2; // Soglia per il livello del mare
      let beachLevel = 0.28; // Soglia per la spiaggia

      let img;
       if (altitude < sealevel) {
        img = waterImage; // Acqua
      } else if (altitude < beachLevel) {
        img = sandImage; // Spiaggia
      } else {
        img = grassImage; // Terra
      }
      

      image(img, x, y, TITLE_SIZE, TITLE_SIZE);
     }
  }
}