let font;
let grass;
let rot;
let ridgeLineTopGraphics;
let ridgeLineMiddleGraphics;
let lakeGraphics;

let isMouseOverStarMessages = false;

function preload() {
  font = loadFont("StayWild.ttf");
}

function mountainsToGraphics(startY, noiseGranularity, startColor, endColor, reductionScaler) {
  const buffer = createGraphics(width, height);
  buffer.noStroke();

  for (let y = startY; y < height; y += 1) {
    const row = [];
    row.push(createVector(0, y));
    for (let x = 0; x < width; x += 1) {
      const n = noise(x * noiseGranularity, y * noiseGranularity);
      const reduction = map(y, 0, height, 1, 0) * reductionScaler;
      const off = y + map(n, 0, 1, -reduction, reduction);
      row.push(createVector(x, off));
    }
    row.push(createVector(width, height));
    row.push(createVector(0, height));
    const amount = map(y, startY, height, 0, 1);
    const c = lerpColor(color(startColor), color(endColor), amount);
    buffer.fill(c);

    buffer.beginShape();
    for (let v of row) {
      buffer.vertex(v.x, v.y);
    }
    buffer.endShape(CLOSE);
  }

  return buffer;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255, 20);
  noiseSeed(80);

  const ridgeLineTop = {
    startY: 260,
    noiseGranularity: 0.015,
    startColor: color('#89CFF0'),
    endColor: color('#000000'),
    reductionScaler: 250,
  };

  // const ridgeLineMiddle = {
  //   startY: 400,
  //   noiseGranularity: 0.009,
  //   startColor: color('#89CFF0'),
  //   endColor: color('#2a52be'),
  //   reductionScaler: 200,
  // };

  const Lake = {
    startY: 500,
    noiseGranularity: 0.0182,
    startColor: color('#A3C1AD'),
    endColor: color('#5F9EA0'),
    reductionScaler: 10,
  };

  ridgeLineTopGraphics = mountainsToGraphics(...Object.values(ridgeLineTop));
  // ridgeLineMiddleGraphics = mountainsToGraphics(...Object.values(ridgeLineMiddle));
  lakeGraphics = mountainsToGraphics(...Object.values(Lake));

  grass = new Yard();
}

function draw() {
  frameRate(10);
  background("#000000");

  // Draw the precomputed mountain shapes
  image(ridgeLineTopGraphics, 0, 0);
  //image(ridgeLineMiddleGraphics, 0, 0);
  image(lakeGraphics, 0, 0);

  // Continue with the rest of the draw logic
  sketchTitle();
  grass.update();

  // Draw the stars
  fill("white");
  let stars = {
    locationX: random(width),
    locationY: random(height - 500),
    size: random(1, 4)
  };
  ellipse(stars.locationX, stars.locationY, stars.size, stars.size);
  
  //starMessages1
  push();
  translate(width * 0.9, height * 0.13);
  rotate(frameCount / -100.0);
  fill("white")
  starMessages(0, 0, 2.5, 15, 5);
  
  pop();
  
  isMouseOverStarMessages = isMouseOver(width * 0.9, height * 0.13, 2.5 * 15, 5);

  // If the mouse is over "//starMessages1", call textNada
  if (isMouseOverStarMessages) {
    textNada();
  }
  
  //starMessages2
  push();
  translate(width * 0.05, height * 0.1);
  rotate(frameCount / -100.0);
  fill("white")
  starMessages(0, 0, 2.5, 15, 5);
  pop();
  
    isMouseOverStarMessages = isMouseOver(width * 0.05, height * 0.1, 2.5 * 15, 5);

  // If the mouse is over "//starMessages1", call textNada
  if (isMouseOverStarMessages) {
    textTif();
  }
  
  //starMessages3
  push();
  translate(width * 0.3, height * 0.15);
  rotate(frameCount / -100.0);
  fill("white")
  starMessages(0, 0, 2.5, 15, 5);
  pop();
  
  isMouseOverStarMessages = isMouseOver(width * 0.3, height * 0.15, 2.5 * 15, 5);

  // If the mouse is over "//starMessages1", call textNada
  if (isMouseOverStarMessages) {
    textKane();
  }
  
  //starMessages4
  push();
  translate(width * 0.5, height * 0.197);
  rotate(frameCount / -100.0);
  fill("white")
  starMessages(0, 0, 2.5, 15, 5);
  pop();
  
  isMouseOverStarMessages = isMouseOver(width * 0.5, height * 0.197, 2.5 * 15, 5);

  // If the mouse is over "//starMessages1", call textNada
  if (isMouseOverStarMessages) {
    textSeptia();
  }
  
  //starMessages5
  push();
  translate(width * 0.72, height * 0.37);
  rotate(frameCount / -100.0);
  fill("white")
  starMessages(0, 0, 2.5, 15, 5);
  pop();
  
  isMouseOverStarMessages = isMouseOver(width * 0.72, height * 0.37, 2.5 * 15, 5);

  // If the mouse is over "//starMessages1", call textNada
  if (isMouseOverStarMessages) {
    textPutta();
  }
  
  
}

function sketchTitle() {
  var sketchTitle = "Sparkling Stars: Short Tales of Southeast Asia’s Aspirations";
  textSize(38);
  textAlign(CENTER);
  textFont(font);
  noStroke();
  fill('#A3C1AD');
  text(sketchTitle, windowWidth / 2, 50);
}

class Yard {
  constructor() {
    this.grass = [];
    this.roff = [];
    this.rwave = [];
    this.size = [];
    this.seg = [];
    this.index = 0;
    this.population = 300;
    for (let x = 0; x < width; x += width / this.population) {
      this.index += 1;
      this.grass.push(x);
      this.roff.push((this.index * 0.065) + 0.015);
      this.rwave.push(0);
      this.size.push(random(15, 25));
      this.seg.push(0.85);
    }
  }

  update() {
    for (let i = 0; i < this.index; i += 1) {
      let len = this.size[i] * 0.65;

      push();
      translate(this.grass[i], 500);
      this.blade(len, i);
      pop();
    }
  }

  blade(len, ind) {
    this.roff[ind] += 0.0025;
    stroke("#304D30");
    rot = map(noise(this.roff[ind]), 0, 1, -QUARTER_PI * 0.75, QUARTER_PI * 0.75);

    strokeWeight(len * 2 * random(0.07, 0.11));
    rotate(rot);
    line(0, 0, 0, -len);
    translate(0, -len);
    if (len > 10) {
      this.blade(len * this.seg[ind], ind);
    }
  }
}

function starMessages(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function textNada(){
  let Nada = "As a pharmacist working as a sales executive in a pharmaceutical raw material distributor, I found numerous issues in matching the raw material document requirements from the Indonesian authorities and the available documents in the manufacturer in Europe. I do hope that the authorities from EU and ASEAN could tackle this issue to maintain the medical supply in Indonesia. - Nada, Indonesia";
  textAlign(LEFT);
  textFont("arial");
  textSize(20);
  text(Nada, windowWidth - 1450, height-200, windowWidth - 50, 
       height + 500);
}

function textPutta(){
  let Putta = "As an IR student and a young researcher from ASEAN, I have high prospect for the ASEAN-EU strategic partnership. These two regions are known for its diverse cultures, languages, and ethnicities; yet so inter-connected through trade, people, and technologies. It is without a doubt that such elevated relations will open doors for more active exchanges in all aspects of the economy and social interaction. In terms of migration, I hope that people within the two regions can migrate safer and smoother for work regardless of their occupations. Ease of mobility for migration will push for greater exchanges of ideas, technologies, and skills, which are currently crucial for all ASEAN countries. Simultaneously, I further hope that this partnership will produce better protection policies for the migrant workers, as well as family members who migrate alongside them. Through strengthen cooperation, ASEAN and EU will be a safe migration corridor for all. - Putta, Cambodia";
  textAlign(LEFT);
  textFont("arial");
  textSize(20);
  text(Putta, windowWidth - 1450, height-200, windowWidth - 50, 
       height + 500);
}

function textKane(){
  let Kane = "I believe that enhancing the partnership between the EU and ASEAN will shape a brighter future. Especially, more connections between young people will accelerate power, potential, and influence on technologies - key stakeholders in development. - Kane, Vietnam"
  textAlign(LEFT);
  textFont("arial");
  textSize(20);
  text(Kane, windowWidth - 1450, height-200, windowWidth - 50, 
       height + 500);
}

function textSeptia(){
  let Septia = "As a pharmacist working in regulatory for export products, I’m hoping that the two regions construct nimbler regulations that smoothen the process of exporting and importing products between the EU and ASEAN. I’m optimistic that, with this strategic partnership, the two regions could backup each other’s supply chain especially in pharmaceutical products. - Septia, Indonesia";
  textAlign(LEFT);
  textFont("arial");
  textSize(20);
  text(Septia, windowWidth - 1450, height-200, windowWidth - 50, 
       height + 500);
}

function textTif(){
  let Tif = "As a legal associate specializing in Foreign Direct Investment (FDI), I rarely encounter cases where investors from the EU community are extensively investing in ASEAN, particularly in Cambodia. Most investors are from Asia. I hope there will be more business forum opportunities for potential businesspersons from ASEAN and the EU to meet and discuss factors for negotiation in their investment endeavors. - Tif, Cambodia"
  textAlign(LEFT);
  textFont("arial");
  textSize(20);
  text(Tif, windowWidth - 1450, height-200, windowWidth - 50, 
       height + 500);
}

function isMouseOver(x, y, width, height) {
  return mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height;
}
