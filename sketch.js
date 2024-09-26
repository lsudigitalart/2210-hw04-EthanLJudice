//Author @Ethan Judice
let score;
let asteroid, ship;
let x, y;
let health, damage;
let randInt;


function setup() {
  createCanvas(400,400);
  randInt = 0;
  score = 0;
  bullet ={
    pos: createVector(mouseX, mouseY),
    damage:1
  };
  //Asteroid stats
  asteroid = {
    pos: createVector(500, 200),
    health: 1,
    speed: 1,
  };
  //Ship stats
  ship = {
    pos: createVector(200, 200),
    health: 10,
  };
//fill(0);  
}

  
function draw() {
  background('black');
  stroke('red');
  line(ship.pos.x,ship.pos.y,mouseX,mouseY);
  fill('black')
  ellipse(mouseX,mouseY,10,10);  
  push();
  //ship
  fill(146,24,24);
  beginShape(ship);
  vertex(ship.pos.x + 10, ship.pos.y+10);
  vertex(ship.pos.x, ship.pos.y-10);
  vertex(ship.pos.x -10, ship.pos.y+10);
  vertex(ship.pos.x, ship.pos.y+5);
  endShape();
  line(ship.pos.x,ship.pos.y+5,ship.pos.x+10,ship.pos.y+10)
  //HUD
  fill("black");
  stroke("green");
  text("Score: " + score, 10, 20);
  //asteroid(s)
  stroke('black');
  fill("gray");
  ellipse(asteroid.pos.x, asteroid.pos.y, 30, 30);
  //Ship damage check
  if (p5.Vector.sub(ship.pos, asteroid.pos).mag() <= 20) {
    ship.health = ship.health - 1;
  }
  //checks if shot lands, if so respawns asteroid in random position
  if(mouseIsPressed){
    bullet.pos = createVector(mouseX, mouseY);
    if (p5.Vector.sub(bullet.pos, asteroid.pos).mag() <= 20) {
      asteroid.health = asteroid.health - 1;
    }
    if(asteroid.health <= 0){
      randInt = random(['0','1','2','3']);
      switch(randInt){
        case '0':
          asteroid.pos.x = 0;
          asteroid.pos.y = random(0,400);
          break;
        case '1':
          asteroid.pos.y = 0;
          asteroid.pos.x = random(0,400);
          break;
        case '2':
          asteroid.pos.x = 400;
          asteroid.pos.y = random(0,400);
          break;
        case '3':
          asteroid.pos.y = 400;
          asteroid.pos.x = random(0,400);
          break;
      }
      asteroid.health = 1;
      score = score + 100;
    }
  }
  //Health detection
  if (ship.health <= 0) {
    background(0);
    textSize(20);
    text("  You Died \n Score:  " + score, 150, 200);
  }
  //movement keys (WASD)
  if (keyIsDown(87)) {
    ship.pos.y -= 2;
  }
  if (keyIsDown(83)) {
    ship.pos.y += 2;
  }
  if (keyIsDown(65)) {
    ship.pos.x -= 2;
  }
  if (keyIsDown(68)) {
    ship.pos.x += 2;
  }
  asteroid.pos.add(p5.Vector.sub(ship.pos, asteroid.pos).limit(asteroid.speed))
  pop();
//Create lazer dot
  if(mouseIsPressed){
    fill(146,24,24)
    ellipse(mouseX,mouseY,5,5);
  } 
}