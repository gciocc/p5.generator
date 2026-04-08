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
let spriteSheet;

let totalFrames = 10;
let sw;
let sh;
let currentFrame = 0;

let backgroundLayer;
let cloudLayer;
let sprites = [];

function preload() {
  grassImage = loadImage("assets/tiles/prato.png");
  sandImage = loadImage("assets/tiles/sabbia.png");
  waterImage = loadImage("assets/tiles/acqua.png");

  ominaImage = loadImage("assets/sprites/omina.png");
  ominoImage = loadImage("assets/sprites/omino.png");

  FishImage = loadImage("assets/fishes/Fish.png");
  TurtleImage = loadImage("assets/fishes/Turtle.png");

  spriteSheet = loadImage(
    "assets/sprites/spritesheet.png",
    () => {},
    () => {
      spriteSheet = null;
    }
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  noStroke();

  sw = spriteSheet ? spriteSheet.width / totalFrames : 814 / totalFrames;
  sh = spriteSheet ? spriteSheet.height : 70;

  backgroundLayer = createGraphics(width, height);
  backgroundLayer.noStroke();

  cloudLayer = createGraphics(width, height);
  cloudLayer.noStroke();

  generateBackground();
  generateSprites();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  backgroundLayer = createGraphics(width, height);
  backgroundLayer.noStroke();

  cloudLayer = createGraphics(width, height);
  cloudLayer.noStroke();

  generateBackground();
  generateSprites();
}

function generateBackground() {
  let centerX = width / 2;
  let centerY = height / 2;
  noiseDetail(6);

  for (let x = 0; x < width; x += TITLE_SIZE) {
    for (let y = 0; y < height; y += TITLE_SIZE) {
      let altitude = computeAltitude(x, y, centerX, centerY);
      let sealevel = 0.2;
      let beachLevel = 0.28;

      let img;
      if (altitude < sealevel) {
        img = waterImage;
      } else if (altitude < beachLevel) {
        img = sandImage;
      } else {
        img = grassImage;
      }

      backgroundLayer.image(img, x, y, TITLE_SIZE, TITLE_SIZE);
    }
  }
}

function generateSprites() {
  sprites = [];
  let centerX = width / 2;
  let centerY = height / 2;

  for (let x = 0; x < width; x += SPRITE_SIZE) {
    for (let y = 0; y < height; y += SPRITE_SIZE) {
      let altitude = computeAltitude(x, y, centerX, centerY);
      let beachLevel = 0.28;
      let deepWaterLevel = 0.05;

      if (random() < 0.08 && altitude > beachLevel) {
        sprites.push(createMovingSprite(x, y, "land"));
      }
      if (random() < 0.06 && altitude < deepWaterLevel) {
        sprites.push(createMovingSprite(x, y, "water"));
      }
    }
  }
}

function createMovingSprite(x, y, type) {
  let angle = random(TWO_PI);
  let speed = type === "water" ? random(0.3, 0.8) : random(0.2, 0.6);
  let size = type === "water" ? FISHES_SIZE : SPRITE_SIZE;
  let imageType = type === "water"
    ? FishImage
    : random() < 0.5
    ? ominaImage
    : ominoImage;

  return {
    x,
    y,
    vx: cos(angle) * speed,
    vy: sin(angle) * speed,
    type,
    size,
    frameOffset: floor(random(totalFrames)),
    imageType,
  };
}

function draw() {
  image(backgroundLayer, 0, 0);
  updateCloudLayer();
  image(cloudLayer, 0, 0);
  updateAndDrawSprites();

  currentFrame = (currentFrame + 1) % totalFrames;
}

function updateCloudLayer() {
  cloudLayer.clear();
  let scale = 0.01;
  let z = frameCount * 0.005;
  cloudLayer.fill(255, 160);

  for (let x = 0; x < width; x += 24) {
    for (let y = 0; y < height; y += 24) {
      let n = noise(x * scale, y * scale, z);
      if (n > 0.52) {
        let w = map(n, 0.52, 1, 16, 80);
        let h = map(n, 0.52, 1, 8, 40);
        cloudLayer.ellipse(x + 12, y + 12, w, h);
      }
    }
  }
}

function updateAndDrawSprites() {
  for (let sprite of sprites) {
    sprite.x += sprite.vx;
    sprite.y += sprite.vy;

    if (sprite.x > width + sprite.size) sprite.x = -sprite.size;
    if (sprite.x < -sprite.size) sprite.x = width + sprite.size;
    if (sprite.y > height + sprite.size) sprite.y = -sprite.size;
    if (sprite.y < -sprite.size) sprite.y = height + sprite.size;

    let frame = (currentFrame + sprite.frameOffset) % totalFrames;
    let sx = frame * sw;

    if (spriteSheet) {
      image(spriteSheet, sprite.x, sprite.y, sprite.size, sprite.size, sx, 0, sw, sh);
    } else {
      image(sprite.imageType, sprite.x, sprite.y, sprite.size, sprite.size);
    }
  }
}

function computeAltitude(x, y, centerX, centerY) {
  let distanceFromCenter = dist(centerX, centerY, x, y);
  let normDistanceFromCenter = distanceFromCenter / (width / 2);
  let altitude = 1 - normDistanceFromCenter;
  let perlin = noise(x / PERLIN_SCALE, y / PERLIN_SCALE);
  altitude *= perlin;
  altitude += perlin;
  altitude -= 0.5;
  return altitude;
}
