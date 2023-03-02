var numFruit;   
var gameTime;  
var level; 
function setUp(a,b,c) {
   level=a;
   gameTime=b; 
   numFruit=c;      
}

$(document).ready(function() {
  let gravity=1000; //the time needed for the fruit to be down
  let force=900;  //the time needed for the fruit to be up
  var gameState='play';
  var canvas=document.getElementById("canvas");
  let winY=canvas.scrollHeight; 
  var span=$("#message span");
  var input=$("#message #input");
  var score;
  var speed;

//   the timer variables
          
     var T;
     var time=[];
     var timerInterval;
     startAgain(gameTime);
     
  function fruit() {

   
        // create the fruits
     var type=Math.floor(Math.random()*6)+1;
     var leftRight=Math.floor(Math.random()*75);
     var height=Math.floor(Math.random()*(winY-200))+winY/4;
     speed=Math.floor(Math.random()*2500)+100; //control the time between the fruits
     img=$("<img id='"+type+"' src='images/fruit"+type+".png'  class='fruit' style='left:"+leftRight+"%'> ");
     $("#canvas").append(img);
     img.animate({
      bottom: height,
      
      },force,function (){
          $(this).animate({bottom:-200},gravity,function(){$(this).remove()})
        }) ;

         // slice the fruits
         
      var fruitImg=$("img");
      $("#canvas").mousemove(function(){
        fruitImg.on('mouseover',function(){
           if ($(this).attr("id")!="sliced" ) { 
            score++;
            progress=(100/numFruit)*score;
            $("#progress2") .css({"width":progress+"%"});
            console.log(progress);
           $("#val").html(`<span style='font-size:60px'>${score-1}</span>+1`);
      //      change the images when cuted
          if (type==5) {
                $(this).attr("src","images/"+$(this).attr("id")+"fruit"+$(this).attr("id")+".png");
 
          }

           $(this).attr("id","sliced");
           setTimeout(() => {
              $("#val").text(`${score}`).css({"fontSize":"30px" });
           }, 300);
            }
        })
      })
       

// Stop button
$("#button").click(function () {
     Stop();
}
      
) 

 // start the game

setTimeout(() => {
    
    if (gameState=='play'&& numFruit>score && (time[0]>0 || time[1]>0) ) {   
          requestAnimationFrame(fruit);


    }      

    else {
      // if you lose
      if ( (time[0]==0 && time[1]==0) && numFruit>score) {
          Stop();
          gameState="lose";
          span.text('You lose');
          input.text('Restart');
      }
      // if you win
      if(numFruit<=score && (time[0]>=0 && time[1]>=0)){
            Stop();
            gameState="win";
            span.text('You win');
            input.html(`<a href='game${level+1}.html'>Next</a>`);
 
      }
    }

  }, speed);
        

       
}

// Start the game
    input.click(function () {
      
         $("#message").hide();

         if (gameState=='lose') {
               startAgain(gameTime);        
               }

         requestAnimationFrame(fruit);
         gameState='play';

    //   Start The timer
          timerInterval=setInterval(() => {
               if (time[1]==0) {
                 time[0]-=1
                 time[1]=59;
               }
               else {
                 time[1]-=1;
               }

               T=time[0]+":"+time[1];

               if (time[1]<10) {
                 T=time[0]+":0"+time[1];
            
               }
            
              $("#timer").html(T);

              if (time[0]==0 && time[1]==0 ) {
                 clearInterval(timerInterval);
              }

           }, 1000);
    
   })


//  Stop the animation function 
 function Stop() {
      gameState='stop';
      $("#canvas").empty();
      span.text('Start the game');
      input.text("Start");
      $("#message").show(); 
      clearInterval(timerInterval);
 } 

//  Set the original values of the game function
 function startAgain(Game_time) {
  score=0;
  time=[Game_time,"00"];
  T=time[0]+":"+time[1];
  $("#val").text("0");
  $("#timer").html(T);
  $("#progress2").css({"width":"0%"});
 }



  })
 
