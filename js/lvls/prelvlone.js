var prelvlOne = {    
        
    init: function (){
        
        this.counter = 0;
        this.map = null;
        this.layer = null;
        this.char = null;
     
        this.speed = 50;
      
        this.safetile = 66;
        this.gridsize = 30;
        this.lastmove = null;
        
        this.physics.startSystem(Phaser.Physics.ARCADE);

    },
    
    preload: function() {       
        this.load.tilemap('map', 'assets/maps/prelvlOneMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/images/sourceimage.png');
        this.load.image('char', 'assets/images/tempChar2.png');
        this.load.image('stone', 'assets/images/blockStone.png');
        this.load.image('goal', 'assets/images/goal.png');
        this.load.image('info', 'assets/images/Screens/INFOprelvlOne.png');
        this.load.image('finish', 'assets/images/Screens/finishLevel.png');
    },

    create: function() {
        
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('sourceimage', 'tiles');
        
        this.layer = this.map.createLayer('prelvlonelayer');

        this.map.setCollisionByExclusion([this.safetile], true, this.layer);
        
        this.goal = this.add.sprite(450, 300, 'goal');
        this.char = this.add.sprite(60, 120, 'char');
        this.stone = this.add.sprite(270, 180, 'stone');
        this.info = this.add.button(70, 120, 'info', this.buttonpressed, this);
        
        this.physics.arcade.enable([this.char, this.goal, this.stone]);
        this.char.body.collideWorldBounds = true;
        
        this.stone.body.immovable = true;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
        
    },
    
    finishButton: function(){
        game.state.start('lvlOne');  
    },
    
    buttonpressed: function(){
        this.info.destroy();
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
        this.physics.arcade.collide(this.char, this.stone);
        
        this.checkKeys();
        
        if(this.counter == 5){
            this.info.kill();   
        }
        
        if(Phaser.Rectangle.intersects(this.char.getBounds(), this.goal.getBounds())){
            console.log("yai")
            this.finish = this.add.button(70, 120, 'finish', this.finishButton, this);
        }
    },
    
    updateCounter: function(){
        this.counter++;
    }
    
};