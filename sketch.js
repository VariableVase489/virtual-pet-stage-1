//Create variables here
var dog, happyDog, database, foodS, foodStock, dogImg, dogImg1;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  db = firebase.database();

  dog = createSprite(250,250);
  dog.scale=0.5;
  dog.addImage("dog Image", dogImg);
  dog.addImage("dog Image 1", dogImg1);

  foodStock = db.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  

  background(rgb(46, 139, 87));
  fill("#580015");
  text("Food Remaining:"+foodS,150, 450);
  if (keyWentDown(UP_ARROW)) {
    dog.changeImage("dog Image 1")
    writeStock(foodS);
  }


  drawSprites();
  //add styles here

}

function writeStock(x){
  if(x > 0) {
    x--;
  } else {
    x = 0;
  }

  db.ref("/").set({
    food : x
  });
  
}

function readStock(data){
  foodS = data.val();
}


