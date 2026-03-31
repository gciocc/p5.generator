let PERLIN_SCALE = 200;
let TITLE_SIZE = 10;
let SPRITE_SIZE = 32;
let FISHES_SIZE = 16;

let grassImage;
let sandImage;
let waterImage;

let ominaImage;
let ominoImage;

let FishImage;
let TurtleImage;

function preload() {
  grassImage = loadImage("assets/tiles/prato.png");
  sandImage = loadImage("assets/tiles/sabbia.png");
  waterImage = loadImage("assets/tiles/acqua.png");

  ominaImage = loadImage("assets/sprites/omina.png");
  ominoImage = loadImage("assets/sprites/omino.png");

  FishImage = loadImage("assets/fishes/Fish.png");
  TurtleImage = loadImage("assets/fishes/Turtle.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();

  let centerX = width / 2;
  let centerY = height / 2;

  for (let x = 0; x < width; x = x + TITLE_SIZE) {
    for (let y = 0; y < height; y = y + TITLE_SIZE) {

      let altitude = computeAltitude(x, y, centerX, centerY);

      // Assegniamo il colore
      let sealevel = 0.2; // Soglia per il livello del mare
      let beachLevel = 0.28; // Soglia per la spiaggia

       // Tiles
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

  for (let x = 0; x < width; x = x + SPRITE_SIZE) {
    for (let y = 0; y < height; y = y + SPRITE_SIZE) {

      let altitude = computeAltitude(x, y, centerX, centerY);

      // Assegniamo il colore
      let sealevel = 0.2; // Soglia per il livello del mare
      let beachLevel = 0.28; // Soglia per la spiaggia
      let deepWaterLevel = 0.05; // Soglia per l'acqua profonda
      
      // Omina
       if (random() < 0.1 && altitude > beachLevel) {
        image (ominaImage, x, y, SPRITE_SIZE, SPRITE_SIZE);
        }
      // Omino
       if (random() < 0.1 && altitude > beachLevel) {
        image (ominoImage, x, y, SPRITE_SIZE, SPRITE_SIZE); 
       }
      // Pesce
       if (random() < 0.1 && altitude < deepWaterLevel) {
        image (FishImage, x, y, FISHES_SIZE, FISHES_SIZE);
       }
      // Tartaruga
       if (random() < 0.1 && altitude < deepWaterLevel) {
        image (TurtleImage, x, y, FISHES_SIZE, FISHES_SIZE);
       }
    }
  }
}

function computeAltitude(x, y, centerX, centerY) {
  // Calcolo distanza dal centro
      let distanceFromCenter = dist(centerX, centerY, x, y);
      let normDistanceFromCenter = distanceFromCenter / (width / 2); // 0-1
      
      // Calcolo altitudine
      let altitude = 1 - normDistanceFromCenter; // 1 al centro, 0 ai bordi

      // Perlin
      noiseDetail(6); // Dettaglio del rumore
      let perlin = noise(x / PERLIN_SCALE, y / PERLIN_SCALE); // Scala per variare la frequenza
      altitude *= perlin;
      altitude += perlin;
      altitude -= 0.5; // Centriamo il rumore intorno a 0

            return altitude;
      }