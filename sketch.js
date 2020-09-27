const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
var engine, world;
var coins,coinsGroup,coins_img
var box,boxGroup,box_img
var database
var gameState = 0;
var playerCount;
var player1,player2,players
var form,game,player
var billImg,poorImg

var allPlayers

var timer = 150

var land

var mountainImg,caveImg,forestImg,plainsImg,volcanoImg,beachImg,mainImg,winImg,loseImg

var backgroundNo = 1
var bg


function preload(){
  mountainImg = loadImage("mountain.jpg")
  caveImg = loadImage('cave.jpg')
  forestImg = loadImage("forest.jpg")
  plainsImg = loadImage('plains.png')
  volcanoImg = loadImage("volcano.png")
  mainImg = loadImage("main background1.jpg")
  poorImg = loadImage("homeless-man.png");
  billImg = loadImage("billionaire.png");
  coins_img = loadImage("coin1.png");
  box_img = loadImage("skull.png");
  beachImg = loadImage("beach.jpg");
  loseImg = loadImage("lose.jpg");
  winImg = loadImage("win.jpg");
}
function setup() {
  createCanvas(displayWidth, displayHeight);
  database = firebase.database();
  engine = Engine.create();
  world = engine.world;
  rando = Math.round(random(1,2))
  billImg.scale = 0.5
  poorImg.scale = 0.5
  
//land = new Ground(837.5,855,1674,10)
land = createSprite(837.5,1100,1674,10)  


game = new Game();
game.getState();
game.start();
coinsGroup = new Group();
boxGroup = new Group();

}

function draw() {
  Engine.update(engine);
  background(mainImg);
 
    
  if (playerCount === 2) {
    game.update(1);
  }
  if (gameState === 1) {
    clear(); 
    game.play();
  }
  if (gameState === 2) {
    game.end();
    
  }


  
  getBackgroundImg()

}

async function getBackgroundImg(){
  
  
  if(backgroundNo === 1){
      bg = caveImg;
  }else if(backgroundNo === 2){
    bg = volcanoImg;
  }else if(backgroundNo === 3){
    bg = mountainImg;
  }else if(backgroundNo === 4){
    bg = plainsImg;
  }else if(backgroundNo === 5){
    bg = forestImg;
  }else if(backgroundNo === 6){
    bg = beachImg
  }

  
}


  
