var dog;
var happyDog;
var database;
var foodS;
var foodStock;

function preload(){
  dogImg=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);

  foodObj = newFood

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);

  feed = createButton("Feed the dog")
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed=data.val()
   });

  fill(255,255,254);
  textsize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM", 350,30);
  }else{
    text("Last Feed : ", lastFed + "AM", 350,30);
  }
  drawSprites();
}

function readStock(data){
  foodS=data.val();
}
function feedDog(){
    dog.addImage(happyDog);


  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function writeStock(x){

  if(x<=0){
    x=0
  }else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}



