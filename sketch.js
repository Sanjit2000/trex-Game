var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided,cloud,cloudImage,count =0;
var ground,invisibleGround, groundImage,obstacle,ob1,ob2,ob3,ob4,ob5,ob6;
var ObstaclesGroup,CloudsGroup
var restartImage,gameoverImage
var restart , gameover

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  cloudImage = loadImage("cloud.png")
  ob1 = loadImage("obstacle1.png")
   ob2 = loadImage("obstacle2.png")
   ob3 = loadImage("obstacle3.png")
   ob4 = loadImage("obstacle4.png")
   ob5 = loadImage("obstacle5.png")
   ob6 = loadImage("obstacle6.png")
  groundImage = loadImage("ground2.png")
  restartImage = loadImage("restart.png")
  gameoverImage = loadImage("gameOver.png")
}

function setup() {
  createCanvas(600, 200);
  
  restart = createSprite(300,100)
  restart.scale = 0.5
  gameover = createSprite(300,70)
  gameover.scale = 0.6
  
  restart.addImage("restart",restartImage)
  gameover.addImage("gameover",gameoverImage)
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided", trex_collided);
  
  trex.setCollider("circle",0,0,30);
  
  ObstaclesGroup = createGroup();
  CloudsGroup = createGroup();
  
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background("white");
  
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count = count+Math.round(getFrameRate()/60);
    
    restart.visible = false
    gameover.visible = false
    
    if (count>0 && count%100 === 0){
      
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 150){
      trex.velocityY = -12 ;
      
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
      
      gameState = END;
      
    }
  }
  
  else if(gameState === END) {
    gameover.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided" ,trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
     if(mousePressedOver(restart)) {
    reset();
    }
    
  }
  
  trex.collide(invisibleGround);
  drawSprites();
  
}

function reset(){
  gameState = PLAY ;
  CloudsGroup.destroyEach();
  ObstaclesGroup.destroyEach();
  gameover.visible = false;
  restart.visible = false;
  trex.changeAnimation("running", trex_running);
  count = 0;
}





function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,320,40,10);
    cloud.y = Math.round(random(20,100));
    cloud.addImage("cloud",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    CloudsGroup.add(cloud)
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,170,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6))
    switch(rand){
      case 1: obstacle.addImage(ob1)
        break
        
        case 2: obstacle.addImage(ob2)
        break
        
        case 3: obstacle.addImage(ob3)
        break
        
        case 4: obstacle.addImage(ob4)
        break
        
        case 5: obstacle.addImage(ob5)
        break
        
        case 6: obstacle.addImage(ob6)
        break
        
    }
    
         ObstaclesGroup.add(obstacle)
    
        
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
  }
}
