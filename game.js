class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data){
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                //player.getCount();
            }
            form = new Form();
            form.display();
        }
        var player1 = createSprite(100,854,4.5,11.9)
        player1.addImage(billImg)
        player1.scale = 0.2
        var player2 = createSprite(200,854,5.5,11.9)
        player2.addImage(poorImg)
        player2.scale = 0.2
        players=[player1,player2];
            
    }
    
    play(){
        form.hide();
        
        Player.getPlayerInfo();
        
        if(allPlayers != undefined){
            background(bg)
            var index = 0;
            var scorepos = 100;
            var x = 100;
            var y= 200;
            
           
          //land.display()
            
          
         // #c68767
            
            
            drawSprites();
            
            for(var plr in allPlayers){
                index +=1;
                x = 110-allPlayers[plr].distance;
                y=0+allPlayers[plr].depth;
                
                players[index -1].x = x;
                players[index - 1].y = y;
                
                if(index === player.index){  
                    fill("red");
                    stroke("black")
                    textSize(25);
                    scorepos+=60;
                    timer = timer - frameCount/6000
                    text(allPlayers[plr].name   + ": " +allPlayers[plr].score,x-35,scorepos); 
                    text('time:'+ Math.round(timer),1000,100)

                    if(players[index -1].x  > 1640 && backgroundNo === 6){
                        gameState = 2
                      }

                    if(players[index -1].x  === 1640 && backgroundNo<6){
                        player.distance = 0
                        console.log("inside if")
                        backgroundNo+=1
                        
                        
                      if(backgroundNo === 1){
                        player.depth = 500
                      }
                      else if(backgroundNo === 2||backgroundNo === 6)
                        player.depth = 900
                      }else if(backgroundNo === 3||backgroundNo === 4||backgroundNo === 5){
                          player.depth = 800
                      }

                     
                   
                }    
            }
        }
            
        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 10
            player.update();
        }
        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.distance += 10
            player.update();
        }
        
            if (frameCount % 40 === 0) {
                coins = createSprite(random(75, 1600), 0, 100, 100);
                coins.velocityY = 18;
                coins.addImage("fruit1",coins_img);
                coins.scale = 0.05
                coinsGroup.add(coins);
            }
            
            for(var i = 0; i<coinsGroup.length; i++){
                var fruitTemp = coinsGroup.get(i);
                if(coinsGroup.isTouching(players) && player.index !== null){
                    fruitTemp.destroy();
                    player.score ++;
                    player.update();
                }
                
        }
        
        if (frameCount % 40 === 0) {
            box = createSprite(random(75, 1600), 0, 100, 100);
            box.velocityY = 18;
            box.addImage("fruit1",box_img);
            box.scale = 0.1
            boxGroup.add(box);
        }

        for(var s = 0; s<boxGroup.length; s++){
            var fruitTemp2 = boxGroup.get(s);
            if(boxGroup.isTouching(players) && player.index !== null){
                fruitTemp2.destroy();
                player.score = player.score-5;
                player.update();
            }
            
    }
    if(boxGroup.isTouching(land) ){
        fruitTemp2.destroy();   
    }

    if(coinsGroup.isTouching(land) ){
        fruitTemp.destroy();   
    }
         
   

    }

    end(){
       game.update(2)
// change backgrooundund .. remove players , spawning object 
background(255)

allPlayers= undefined

if(player.score<=0||timer <= 0){
    background(loseImg)
    console.log("lala")
}else if(player.score>0){
    background(winImg)
}
    }
    
}