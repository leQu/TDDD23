var lvlThree = {    
        
    init: function (){
    
        this.map = null;
        this.layer = null;
        this.char = null;
     
        this.speed = 50;
      
        this.safetile = 113;
        this.gridsize = 30;
        this.lastmove = null;
        
        this.physics.startSystem(Phaser.Physics.ARCADE);

    },
    
    preload: function() {       
        this.load.tilemap('map', 'assets/maps/lvlThreeMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/images/sourceimage3.png');
        this.load.image('char', 'assets/images/tempChar2.png');
        this.load.image('goal', 'assets/images/goal.png');
        this.load.spritesheet('movinglever1', 'assets/images/movinglever1.png');
        this.load.spritesheet('movinglever2', 'assets/images/movinglever2.png');
        this.load.image('blockStone', 'assets/images/blockStone.png');
        this.load.image('leverStone', 'assets/images/stoneLever.png');
        this.load.image('info', 'assets/images/Screens/INFOlvlThree.png');
    },

    create: function() {
        
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('sourceimage3', 'tiles');
        
        this.layer = this.map.createLayer('mainlayer');
        this.overlayer = this.map.createLayer('seclayer');

        this.map.setCollisionByExclusion([this.safetile], true, this.layer);
        
        this.goal = this.add.sprite(120, 450, 'goal');
        this.lever1 = this.add.sprite(360, 390, 'movinglever1');
        this.lever2 = this.add.sprite(30, 60, 'movinglever1');
        this.stone1 = this.add.sprite(180, 180, 'blockStone');
        this.stone2 = this.add.sprite(120, 270, 'blockStone');
        this.leverStone = this.add.sprite(210, 30, 'goal');
        this.leverStone2 = this.add.sprite(30, 330, 'goal');
        
        this.char = this.add.sprite(270, 0, 'char');
        
        this.triggerButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.triggerButton.onDown.add(testFloor3, this)
        this.info = this.add.button(50, 120, 'info', this.buttonpressed, this);
        
        this.physics.arcade.enable([this.char, this.goal, this.lever1, this.lever2, this.stone1, this.stone2, this.leverStone]);
        this.char.body.collideWorldBounds = true;
        
        this.leverStone.body.immovable = true;
        this.stone1.body.immovable = true;
        this.stone2.body.immovable = true;

        this.cursors = this.input.keyboard.createCursorKeys();
        
    },
    
    buttonpressed: function(){
        this.info.kill();
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
        this.physics.arcade.collide(this.char, this.layer);
        this.physics.arcade.collide(this.char, this.stone1);
        this.physics.arcade.collide(this.char, this.stone2);
        this.physics.arcade.collide(this.char, this.leverStone);
        
        this.checkKeys();
        
        if(Phaser.Rectangle.intersects(this.char.getBounds(), this.leverStone.getBounds())){
            console.log("working")
            this.overlayer.sendToBack();
            
        }
        else if(Phaser.Rectangle.intersects(this.char.getBounds(), this.leverStone2.getBounds())){
            this.overlayer.sendToBack();   
        }
        else if(Phaser.Rectangle.intersects(this.char.getBounds(), this.goal.getBounds())){
            game.state.start('Menu');   
        }   
        //Needed to keep the infoquare on top untill it dies.
        else if(!this.info.alive) {
            this.overlayer.bringToTop();
            this.char.bringToTop();
        }
    }
    
};

function testFloor3(){
    if(Phaser.Rectangle.intersects(this.char.getBounds(), this.lever1.getBounds())){
        console.log("LEVER1 BUTTON")
        if(this.stone1.alive){
            this.stone1.kill();
            this.lever1.loadTexture('movinglever2', 0, false);
            console.log("Stone1 is removed");
        }
        else{
            this.stone1.reset(180, 180);  
            this.lever1.loadTexture('movinglever1', 0, false);
            console.log("Stone1 is added");
        } 
    }
    else if(Phaser.Rectangle.intersects(this.char.getBounds(), this.lever2.getBounds())){
        console.log("LEVER2 BUTTON")
        if(this.stone2.alive){
            this.stone2.kill();
            this.lever2.loadTexture('movinglever2', 0, false);
            console.log("Stone2 is removed");
        }
        else{
            this.stone2.reset(120, 270);  
            this.lever2.loadTexture('movinglever1', 0, false);
            console.log("Stone2 is added");
        } 
    }
}