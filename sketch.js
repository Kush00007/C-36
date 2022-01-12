var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount;
var mygs
var mypc
var car1img,car2img,trackimg
var allplayers=[]
var car1,car2,cars

function preload() {
  backgroundImage = loadImage("/assets/background.png");
  car1img = loadImage("/assets/car1.png")
  car2img = loadImage("/assets/car2.png")
  trackimg = loadImage("/assets/track.jpg")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.start();

}

function draw() {
  background(backgroundImage);
  if(mypc === 2 )
  {
    game.updategs(1)
  }
  if(mygs === 1 ){
    game.play()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
