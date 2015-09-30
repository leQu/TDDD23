var lvlOne = {    
        
    init: function (){
    
        this.map = null;
        this.layer = null;
        this.char = null;
     
        this.speed = 50;
      
        this.safetile = 63;
        this.gridsize = 30;
        this.lastmove = null;
        
        this.physics.startSystem(Phaser.Physics.ARCADE);

    },
    
    preload: function() {       
        this.load.tilemap('map', 'assets/maps/lvlOneMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/images/sourceimage.png');
        this.load.image('char', 'assets/images/tempChar2.png');
        this.load.image('goal', 'assets/images/goal.png');
        this.load.image('finish', 'assets/images/Screens/finishLevel.png');
    },

    create: function() {
        
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('sourceimage', 'tiles');
        
        this.layer = this.map.createLayer('lvlonelayer');

        this.map.setCollisionByExclusion([this.safetile], true, this.layer);
        
        this.goal = this.add.sprite(450, 360, 'goal');
        this.char = this.add.sprite(30, 0, 'char');
        
        this.physics.arcade.enable([this.char], [this.goal]);
        this.char.body.collideWorldBounds = true;

        this.cursors = this.input.keyboard.createCursorKeys();
        
    },
    
    finishButton: function(){
        game.state.start('lvlTwo');  
    },
    
    checkKeys: function(){
        
        if (this.cursors.left.isDown){
            this.char.body.velocity.x = -100;
            this.lastmove = "left";        
        }
        else if(this.cursors.right.isDown){
            this.char.body.velocity.x = 100;
            this.lastmove = "right";
        }
        else if(this.cursors.up.isDown){
            this.char.body.velocity.y = -100;
            this.lastmove = "up"
        }
        else if(this.cursors.down.isDown){
            this.char.body.velocity.y = 100;
            this.lastmove = "down";
        }
        else {
            if(this.lastmove == "down"){
                if(Math.ceil((this.char.position.y)/30) == Math.floor(0.1+((this.char.position.y)/30))){
                    this.char.body.velocity.y = 0;
                    this.char.position.y = 30*(Math.round(0.4+((this.char.position.y)/30)))
                }
            }
            else if(this.lastmove == "up"){
                if(Math.ceil((this.char.position.y)/30) == Math.floor(0.1+((this.char.position.y)/30))){
                    this.char.body.velocity.y = 0;
                    this.char.position.y = 30*(Math.round(0.4+((this.char.position.y)/30)))
                }
            }
            else if(this.lastmove == "right"){
                if(Math.ceil((this.char.position.x)/30) == Math.floor(0.1+((this.char.position.x)/30))){
                    this.char.body.velocity.x = 0;
                    this.char.position.x = 30*(Math.round(0.4+((this.char.position.x)/30)))
                }
            }
            else if(this.lastmove == "left"){
                if(Math.ceil((this.char.position.x)/30) == Math.floor(0.1+((this.char.position.x)/30))){
                    this.char.body.velocity.x = 0;
                    this.char.position.x = 30*(Math.round(0.4+((this.char.position.x)/30)))
                }
            }

        }

    },
    
    update: function(){
        //console.log(this.char.position.y)
        //console.log(this.char.position.x)
        this.physics.arcade.collide(this.char, this.layer);
        
        this.checkKeys();
        
        if(Phaser.Rectangle.intersects(this.char.getBounds(), this.goal.getBounds())){
            console.log("yai")
            this.finish = this.add.button(70, 120, 'finish', this.finishButton, this);
        }
    }
    
};
    