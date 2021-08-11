var ground;
var dustbinImg,bin1;
var paperImg,paperSprite;
var MarketImg,GAMEOVERImg;
var startScreen;
var score=0;
var appleSound;
var Start = 1;
var Play  = 1;
var End   = 0;
var gameState = Start;
var gameState = Play;
var gameState = End;
var log1, log2, log3, slingshot;
const Engine = Matter.Engine;
const World = Matter.World;
const Constraint = Matter.Constraint;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	dustbinImg = loadImage("dustbingreen.png");
	MarketImg = loadImage("Market.png");	
    appleSound = loundSound("apple throw.mp3");
	GAMEOVERImg = loadImage("Game_Over.png");
}

function setup() {
	createCanvas(800, 700);


	engine = Engine.create();
	world = engine.world;

	Engine.run(engine);
  
   Start = new start();

	log1 = new Log(600, 640, 150, 20);
	log2 = new Log (550, 580, 20, 150);	
	log3 = new Log(680, 580, 20, 150);

    rightedge = Bodies.rectangle(400, 0, 3,400);

	//bin1 = new Bin(600, 547, 190, 200);

	ground = new Ground(400, 650, 800, 20);
	sky    = new Ground(400,-20,800,10);
    left   = new Ground(-10,350,10,700);
    right  = new Ground(810,350,10,700);
	ground.shapeColor = color("brown")
	
	paperSprite = new Paper(400,150,70, {density:90, friction: 0.5,});
    slingshot = new Slingshot(paperSprite.body,{x:400, y:150});
}



function draw() {
  rectMode(CENTER);
  background(MarketImg);
 
  if(gameState === Play){
  
  paperSprite.display();

  //ground.display();
  log1.display();
  log2.display();
  log3.display();
  slingshot.display();
  image(dustbinImg,log1.body.position.x-80,530,200,150);

  //bin1.display();

var collision = Matter.SAT.collides(paperSprite.body,log1.body);

if(collision.collided)
{

    flag=1;

}

if(flag ===1){

	textSize(30);
	Stroke(3);
	fill('blue');
	text("The Apple Hits the Basket",500,200)
	slingshot.attach(paperSprite.body);
}

if(flag ===0){
	slingshot.attach(paperSprite.body);
}
 moveBasket(); 
 
console.log(mouseX)
}

 if(appleSound.collided(ground)){

   gameState = End;

 } 

 if(gameState === End){
	background(GAMEOVERImg);
	paperSprite.x = 3000;
	paperSprite.y = 3000;
    log1.x = 4000;
    log2.x = 4000;
    log3.x = 4000;
	log1.y = 4000;
    log2.y = 4000;
    log3.y = 4000;
 }

  drawSprites();
 
}

function moveBasket(){
if(frameCount%50 === 0){

	var ran = random(10,750);
	log1.body.position.x=ran;
	log2.body.position.x=ran-50;
	log3.body.position.x=ran+80;
}


}

//function keyPressed(){
//	if(keyCode === UP_ARROW){
//		Matter.Body.applyForce(paperSprite.body,paperSprite.body.position, {x:269, y: -620});
//	}
//}


  
  function mouseDragged(){
	Matter.Body.setPosition(paperSprite.body, {x: mouseX, y: mouseY})
  
}
  function mouseReleased(){	
	slingshot.fly();
	appleSound.play();
  }
  function keyPressed(){
	if(keyCode === 32){
	  slingshot.attach(paperSprite.body);
	}
  }
