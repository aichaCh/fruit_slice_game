$(document).ready(function() {
  let gravity=1000; //the time needed for the fruit to be down
  let force=900;  //the time needed for the fruit to be up
  var gameState='start';
  var canvas=document.getElementById("canvas");
  let winY=canvas.scrollHeight; 
  var i=0; 


  function fruit() {

   
        // create the fruits
     let speed=Math.floor(Math.random()*2500)+100; //control the time between the fruits
     var type=Math.floor(Math.random()*6)+1;
     var leftRight=Math.floor(Math.random()*75);
     var height=Math.floor(Math.random()*(winY-250))+winY/4;
     img=$("<img src='images/fruit"+type+".png'  class='fruit'style='left:"+leftRight+"%'> ");
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
           i++;
           $("#val").html(`<span style='font-size:60px'>${i-1}</span>+1`);
           $(this).attr("id","sliced");
           setTimeout(() => {
              $("#val").text(`${i}`).css({"fontSize":"30px" });
           }, 300);
            }
        })
      })
        

        setTimeout(() => {
          requestAnimationFrame(fruit);
        }, speed);
        // console.log(speed)
       
}
    // start the game
    $("#message input").click(function () {
      $("#message").hide();
      requestAnimationFrame(fruit);
      gameState='play';

   })
  
    
 
  })
 
