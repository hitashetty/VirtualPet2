//Create variables here
var dog, happyDog, database, foods, foodstock,dogimage,happydogimage,food,milkimage,milk1,addfood,addfood,feed,feeddog,lastfed,milk,fedtime,foodobj;



var milk2;
var milk3;
var milk4;
var milk5;
var milk6;
var milk7;
var milk8;
var milk9;
var milk10;
function preload()
{
 dogimage= loadImage("Dog.png");
 happydogimage= loadImage("happyDog.png");
 milkimage = loadImage("Milk.png");


}

function setup() {
  createCanvas(800, 500);
  database = firebase.database();
  foodstock = database.ref('Food');
  foodstock.on('value',readstock);

  dog = createSprite(600, 390,20,20);
  dog.addImage(dogimage);
  dog.scale = 0.3;


feed = createButton('Feed the dog');
feed.position(600,300);
feed.mousePressed(feeddog);

addfood= createButton('Add food');
addfood.position(500,300);
addfood.mousePressed(addFood);

foodobj = new Food(200,200,20,20);
}



function draw() {  
background(46,139,87);
foodobj.display();

fedtime = database.ref('FeedTime');
fedtime.on("value",function(data){
lastfed=data.val();
});

fill("blue");

if(lastfed>=12){
  text("Last Feed : " + lastfed%12 + "PM",350,30);
}
else if(lastfed==0){
 text("Last Feed : 12AM",350,30);
}
else{
text("Last Feed : ",lastfed+ "AM",350,30);
}


  drawSprites();
  fill("darkblue");
  text("note, tap the up arrow to feed the puppy",300,20);
  text("puppy food left:"+foods ,540,200);

}

function readstock(data){
  foods=data.val();
  foodobj.updatefoodstock(foods)
}

function feedog(){
  dog.addImage(happydogimage);
  if(foodobj.getfoodstock<=0){
    foodobj.updatefoodstock(foodobj.getfoodstock()*0)
  }

else{
  foodobj.updatefoodstock(foodobj.getfoodstock()*-1)

}
  database.ref('/').update({
    food:foodobj.getfoodstock(),
    feedtime:hour()
  })
}

function addFood(){
  foods++;
  database.ref('/').update({
    food : foods
  })
}