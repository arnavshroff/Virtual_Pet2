//Create variables here
var rabbitImage;
var rabbitImage2;
var rabbit;
var database;
var food,foodStock,nameref,foodS;
var feed,addfood;
var fedTime,lastFed;
var input,button,greeting,Name;

function preload()
{
  //load images here
  rabbitImage = loadImage("rabbit.png");
  rabbitImage2 = loadImage("rabbit2.png");
}

function setup() {
  createCanvas(500, 500);
  rabbit = createSprite(400,250,50,50);
  rabbit.addImage(rabbitImage2);
  rabbit.scale = 0.3;

  food = new Food()

  database = firebase.database();

  //Reference for food
  foodStock = database.ref("Food");
  foodStock.on("value",read,console.log("error"));

  //foodRef.set(50);
  nameref=database.ref("name");
  nameref.on("value",function(data)
  {
    name=data.val();
  })
  
  //feed the rabbit button
  feed=createButton("Feed the rabbit");
  feed.position(580,67);
  feed.mousePressed(feedrabbit);

  //add food button
  addFood=createButton("Add Food")
  addFood.position(400,100);
  addFood.mousePressed(addFoods);


  input=createInput("Change Pet Name");
  input.position(400,67);
  
  
  button=createButton("SUBMIT");
  button.position(500,90);
  button.mousePressed(renamingrabbit)

  
// add = createButton("ADD FOOD")
// add.position(400,15)
// add.mousePressed(AddFood)
  
  
}


function draw() {  
  background("gold");
  //drawSprites();

  food.display()
   //fetching fedtime from database
   fedTime=database.ref("FeedTime");
   fedTime.on("value",function(data)
   {
     lastFed=data.val();
   })
  
   
 
   fill("white");
   textSize(15);
   if(lastFed>=12)
   {
    fill("purple")
     text("Last Feed : "+ lastFed%12 + " PM",350,30);
   }
   else if(lastFed===0)
   {
    fill("purple")
     text("Last Feed : 12 AM",350,30)
   }
   else
   {
     fill("purple")
     text("Last Feed : "+ lastFed + " AM",350,30);
   }
 
   if(Name!==undefined)
   {
   text("Your Pet Name: "+ name,55,100);
   }
 
   //To draw the sprites on canvas
   drawSprites();
 
  
   
 }

  // decreaseFood();

  // textSize(32);
  // fill("blue");
  // text("Bones in the Stock: "+foodStock,50,100);

  // if(foodStock === 0){
  //   textSize(32);
  //   fill("red");
  //   text("No More Food",50,300);
  //   food.visible = false;
  // }
  

function read(data){
  foodS= data.val();
  food.updateFoodStock(foodS);
}

// function decreaseFood(){
//   if(keyWentDown(UP_ARROW)&& foodStock>0){
//   foodRef = database.ref("Food");
//   foodStock = foodStock - 1;
//   foodRef.set(foodStock);
//   rabbit.addImage(rabbitImage);
//   rabbit.scale = 0.7;
  
//   textSize(28)
//   fill("yellow");
//   text("Thank you",10,50);
//   // food.x = 350;
//   // food.y = 200;
//   food.visible = false;
//   //food.scale = 0.1;

//   }
  
//   if(keyWentUp(UP_ARROW)){
    
//     foodStock = foodStock;
//     rabbit.addImage(rabbitImage2);
//     rabbit.scale = 0.3;
//     food.x = 100;
//     food.y = 300;
//     food.visible = true;
//     //food.scale = 0.2;
    
//   }
// }
function feedrabbit()
{ if(foodS>0){
  rabbit.addImage(rabbitImage);
  rabbit.scale = 0.5
}
else{
  rabbit.addImage(rabbitImage2);
  rabbit.scale = 0.3
}

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref("/").update({
    Food: food.getFoodStock(),
    FeedTime: hour()
  })
  
}

//function to add the rabbit
function addFoods()
{
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}

function renamingrabbit()
{
  Name=input.value();
  button.hide();
  input.hide();
  database.ref("/").update({
    name:Name
  })

}




