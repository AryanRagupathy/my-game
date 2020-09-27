class Player {
    constructor(x,y,width,height,flag) {
        this.index = null;
        this.distance = 0;
        this.depth = 500;
        this.name = null;
        this.score =0;
        this.flag = flag
        var options = {
            'restitution':0.8,
            'friction':1.0,
            'density':1.0
        }
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
      /*  if(flag==="P"){
        this.image = loadImage("homeless-man.png");
        }else if(flag==="B"){
            this.image = loadImage("billionaire.png");
        }
        */
        World.add(world, this.body);
    }

    getCount() {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", (data)=> {
            playerCount = data.val();
        })
    }


    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        });
    }

    update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            score:this.score,
            depth: this.depth
        });
    }

    static getPlayerInfo() {
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        })
    }
    
    display(){
        var angle = this.body.angle;
        push();
        translate(this.body.position.x, this.body.position.y);
        //rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
        pop();
      }
    
      
}