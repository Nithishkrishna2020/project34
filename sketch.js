var dog,happyDog,database,foodS,foodStock;
var dogImg,happyDogImg;
var milkImg;
var feedDog;
function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  milkImg = loadImage("images/Milk.png");
  
}

function setup() {
  feed = createButton("Feed the dog");
  feed.position(600,95);
 
  addFood = createButton("Add Food");
  addFood.position(700,95);
 
  database = firebase.database();
  console.log(database);
	createCanvas(500, 500);
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  dog = createSprite (250,250,50,20);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  milk = createSprite(150,250,20,10);
  milk.addImage(milkImg);
  milk.scale = 0.1;
 
}


function draw() { 
  background(255,255,254);
  fill("green");
  textSize(15);
  text("Press UP_ARROW to feed the dog",110,20);
  text("Remaning food: "+foodS,190,170)
  //text(mouseX+":"+mouseY,mouseX,mouseY);
  addFood.mousePressed(addFoods);
  feed.mousePressed(feedDog);
  if(keyWentDown(UP_ARROW)){
    feedDog();
    dog.addImage(happyDogImg);
  }
  
  for(var i=0;i<foodS;i=i+1){
    image(milkImg,20*i,300,50,100);
  }
  
  


 

  drawSprites();

}

  

//add styles here
function readStock(data){
  foodS = data.val();

}
function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x=x-1;
  }
  
}
function feedDog(){
  dog.addImage(happyDogImg);

 
  foodS--;
  database.ref('/').update({
    Food:foodS
    
  });
  

}


function addFoods(){
foodS++;
database.ref('/').update({
  Food:foodS
  
})
}
