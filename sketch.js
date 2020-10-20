var monkey, monkeyrunning;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;

function preload() {


  monkeyrunning = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(400, 400);
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("ani", monkeyrunning)
  monkey.scale = 0.10;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -7;

  foodGroup = new Group();
  obstacleGroup = new Group();


}


function draw() {
  background("darkgreen");

  stroke("white");
  textSize(20);
  fill("white");
  text("score:" + score, 320, 40);



  stroke("black")
  fill("black")
  text("survivalTime:" + survivalTime, 100, 40);
  survivalTime = Math.round(Math.ceil(frameCount / frameRate()));
  if (monkey.visible === true) {
    monkey.velocityY = 7;

    if (foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      score = score + 2;
    }
    if (obstacleGroup.isTouching(monkey)) {

      monkey.visible = false;


    }
    ground.x = ground.width / 2;

    obstacles();
    bannana1();

    if (keyDown("space") && monkey.y < 317 && monkey.y > 313) {
      monkey.velocityY = -150;
    }
  }


  if (monkey.visible === false) {
    survivalTime = 0;
    ground.visible = false;
    text("you failed!", 150, 200);
    ground.x = ground.width / 2;
    text("press space to restart", 100, 230);
    if (keyWentDown("space")) {
      monkey.visible = true;
      ground.visible = true;
      survivalTime = 0;
    }
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
  }



  monkey.collide(ground)
  drawSprites();
}

function bannana1() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400, 160, 10, 10);
    banana.y = Math.round(random(150, 200));
    banana.addImage("bananapic", bananaImage);
    banana.velocityX = -7;
    banana.setLifetime = 110;
    banana.scale = 0.1;
    foodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(400, 335, 50, 50);
    obstacle.velocityX = -7;
    obstacle.addImage("obpic", obstacleImage);
    obstacle.scale = 0.10;
    obstacle.lifetime = 110;
    obstacleGroup.add(obstacle);
  }
}