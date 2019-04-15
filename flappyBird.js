var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var fly = new Audio();
var scor = new Audio();

bird.src= "images/bird.png";
bg.src= "images/bg.png";
fg.src="images/fg.png";
pipeNorth.src="images/pipeNorth.png";
pipeSouth.src="images/pipeSouth.png";
fly.src="sounds/fly.mp3";
scor.src="sounds/score.mp3";
//some Variables
var gap = 350;
var constant = pipeNorth.height+gap;
var bx=10;
var by=150;
var gravity=1.1;
var score=0;
//on keypress
document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == 40) {
      
  if(by>25)
  {

    by+=35;
    fly.play();
  }
}
if (evt.keyCode == 38) {
      
  if(by>25)
  {

    by-=40;
    fly.play();
  }
}

if (evt.keyCode == 39) {
      

    bx+=35;
    fly.play();
  
}

};

// document.addEventListener("keydown",moveUp);
// function moveUp(){

//   if(by>25)
//   {

//     by-=35;
//     fly.play();
//   }
// }
//pipe coordinates
var pipe = [];
pipe[0]= {

  x:cvs.width,
  y:0

};
//draw images

fg.onload = bg.onload=function draw(){
  
   
  // alert("Hey");
  ctx.drawImage(bg,0,0);
  for (let i = 0; i< pipe.length; i++) {
      
      ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
     
      ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
      pipe[i].x--;
      
      
      if(((bx+bird.width) >= pipe[i].x && bx <= (pipe[i].x+pipeNorth.width)) && (( by <= (pipe[i].y + pipeNorth.height))|| ((by + bird.height) >= (pipe[i].y + constant))))
      {
        // alert("Score : "+score);
        location.reload();
      }
      if(pipe[i].x==125)
      {
        pipe.push({
          x:cvs.width,
          y:Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
        });
      }
      if(pipe[i].x==5)
      {
        scor.play();
        score++;
      }
    }

  // ctx.drawImage(pipeNorth,100,0);
  // ctx.drawImage(pipeSouth,100,00+constant);
  ctx.drawImage(fg,0,cvs.height-fg.height);
  ctx.drawImage(bird,bx,by);

  by+=gravity;
    ctx.fillStyle="#000";
    ctx.font="20 px Verdana";
    ctx.fillText("Score : "+score,10,20);
  if(by>=(cvs.height-fg.height-bird.height))
    {
      location.reload();
      // alert("gameover");
      // break;
    }
    
  requestAnimationFrame(draw);

}

draw();
