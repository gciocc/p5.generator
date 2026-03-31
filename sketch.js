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
      
      let altitude = 1 - normDistanceFromCenter; // 1 al centro, 0 ai bordi

      fill(altitude* 255);
      rect(x, y, 1, 1);
     }
  }
}