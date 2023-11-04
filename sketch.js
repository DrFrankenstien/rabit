const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit, rope,rope2,rope3;
var fruit_con,fruit_con_2,fruit_con_3;

var bg_img;
var food;
var rabbit;

var button,button2, button3;
var blink;
var eat;
var sad;
var canW, canY

function preload() {

  food = loadImage("melon.png");
  rabit = loadImage("Rabbit-01.png");
  bg_img = loadImage("background.png");

  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");


  blink.playing = true;
  eat.playing = true;
  eat.looping = false;
  sad.playing = true;
  sad.looping = false;
}



function setup() {
  //createCanvas(500, 700);
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }

  
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200, 680, 600, 20);

  blink.frameDelay = 20
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  rabbit = createSprite(200, 600, 50, 80);
  rabbit.addAnimation("blinking", blink);
  rabbit.addAnimation("eating", eat);
  rabbit.addAnimation("crying", sad);
  rabbit.changeAnimation("blinking");
  rabbit.scale = 0.2;


 // btn1
  button = createImg('cut_button.png');
  button.position(200, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

  // btn2
  button2= createImg('cut_button.png');
  button2.position(100, 15);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  // btn3
  button3 = createImg('cut_button.png');
  button3.position(300,45);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  
  // ROPE1
  rope = new Rope(7, { x: 245, y: 18 });

  // ROPE2
  rope2= new Rope(7, { x: 145, y: 30 });

  // ROPE3 
  rope3= new Rope(7,  { x: 345, y: 48 });


  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);
  fruit_con_2 = new Link(rope2, fruit);
  fruit_con_3 = new Link(rope3, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);


}

function draw() {
  background(51);

  //image(image, x, y, w ,h)

  image(bg_img, 10, 200, displayWidth + 80, displayHeight);
  //image(rabit, 200, 200, 100, 85);
  
  if (fruit != null) {
    image(food, fruit.position.x, fruit.position.y, 70, 70);
  }

  drawSprites();

  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();

  if (collide(fruit,  rabbit) == true) {
    rabbit.changeAnimation("eating");
    fruit = null;
  }
  if(fruit!=null && fruit.position.y>=650)
  {
    rabbit.changeAnimation('crying');
  
    fruit=null;
     
   }

}

function drop() {
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}

function drop2() {
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}

function drop3() {
  rope3.break();
  fruit_con_3.detach();
  fruit_con_3 = null;
}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= 80) {
      World.remove(engine.world, fruit);
      fruit = null;
      return true;
    }
    else {
      return false;
    }
  }
}
