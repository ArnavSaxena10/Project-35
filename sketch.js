//Create variables here
var dog1, dog, happyDog, database, foods, foodStock;
var addFood, feed, fedTime, lastFed, food1, FoodObj, t=1, flag=0;


function preload(){
  //load images here
  dog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
  dog1 = createSprite(250,300,10,10);
  dog1.addImage(dog);
  dog1.scale=0.20;

 foodStock=database.ref("FoodObj").on("value",readStock);

 fedTime=database.ref("FeedTime/hour").on("value",(data)=>{
   lastFed=data.val();
 });

 food1 = new Food();

}


function draw() {  
background(46,139,87);


// if(keyWentDown(UP_ARROW)){
//   writeStock(foods);
//   dog1.addImage(happyDog);
// }

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed: "+lastFed+" PM",300,30);
}
else if(lastFed==0){
  text("Last Feed: 12 AM",300,30);
}
else{
  text("Last Feed: "+ lastFed+" AM",300,30);
}

food1.display();

lastFed=hour();

if(flag===1&& t>0){
  timer();
}

if(t===0){
  dog1.addImage(dog);
  dog1.scale=0.20;
  flag=0;
}

  drawSprites();
  //add styles here
  // textSize(20);
  // stroke(4);
  // fill("white");
  //   text("Note: Press UP_ARROW Key To Feed Drago Milk!", 22,30);


  // if(feed.mousePressed){
  //   dog1.addImage(happyDog);
  //   dog1.scale=0.20;
  // }
  // else{
  //   dog1.addImage(dog);
  //   dog1.scale=0.20;
  // }
}

function readStock(data){
  foods=data.val();
  console.log(foods)
}

function writeStock(x){

  if(x<=0){
    x=0;
  }

  else{
    x=x-1;
  }
  database.ref('/').update({
    FoodObj:x
  })
}

function addFoods(){
  foods++;
  database.ref('/').update({
    FoodObj:foods
  })

}

function feedDog(){
  dog1.addImage(happyDog);
  flag=1;

  foods=foods-1;
  database.ref('/').update({
    FoodObj:foods,
    FeedTime:hour()
  })
}

function timer(){

  if (frameCount % 60 == 0 && t > 0){
    t--;
  }
}



