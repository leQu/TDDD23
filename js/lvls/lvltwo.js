var lvlTwo = {    
        
    init: function (){
    
        this.map = null;
        this.layer = null;
        this.char = null;
     
        this.speed = 50;
      
        this.safetile = 52;
        this.gridsize = 30;
        this.lastmove = null;
        
        this.physics.startSystem(Phaser.Physics.ARCADE);

    },
    
    preload: function() {       
        this.load.tilemap('map', 'assets/maps/lvlTwoMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/images/sourceimage2.png');
        this.load.image('char', 'assets/images/tempChar2.png');
        this.load.image('goal', 'assets/images/goal.png');
        this.load.image('blockStone', 'assets/images/blockStone.png');
        this.load.spritesheet('movinglever1', 'assets/images/movinglever1.png');
        this.load.spritesheet('movinglever2', 'assets/images/movinglever2.png');
        this.load.image('info', 'assets/images/Screens/INFOlvlTwo.png');
        this.load.image('finish', 'assets/images/Screens/finishLevel.png');
        this.load.spritesheet('charAll', 'assets/images/characterSprites/SpriteALL.png', 30, 30, 12);
    },

    create: function() {
        
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('sourceimage2', 'tiles');
        
        this.layer = this.map.createLayer('mainlayer');

        this.map.setCollisionByExclusion([this.safetile], true, this.layer);
        
        this.goal = this.add.sprite(270, 450, 'goal');     
        this.lever1 = this.add.sprite(330, 360, 'movinglever1');
        this.lever2 = this.add.sprite(120, 270, 'movinglever1');       
        this.stone1 = this.add.sprite(210, 240, 'blockStone');
        this.stone2 = this.add.sprite(270, 390, 'blockStone');
        this.info = this.add.button(50, 120, 'info', this.buttonpressed, this);
        this.char = this.add.sprite(270, 0, 'charAll');
        
        this.char.animations.add('moveUp', [9,10], 10, true);
        this.char.animations.add('moveDown', [0,1], 10, true);
        this.char.animations.add('moveRight', [6,7], 10, true);
        this.char.animations.add('moveLeft', [3,4], 10, true);
        
        this.triggerButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.triggerButton.onDown.add(testFloor2, this)
        
        this.physics.arcade.enable([this.char, this.goal, this.lever1, this.lever2, this.stone1, this.stone2]);
        this.char.body.collideWorldBounds = true;
        
        this.stone1.body.immovable = true;
        this.stone2.body.immovable = true;

        this.lever1.body.immovable = true;
        this.lever2.body.immovable = true;

        this.cursors = this.input.keyboard.createCursorKeys();
        
    },
    
    buttonpressed: function(){
        this.info.kill();
    },
    
    finishButton: function(){
        game.state.start('prelvlThree');
    },
    
    checkKeys: function(){
        
        if (this.cursors.left.isDown){
            this.char.animations.play('moveLeft', 15, true);
          //  this.char.body.velocity.y = 0; //Needed to make him fucking stop sliding!
            this.char.body.velocity.x = -100;
            this.lastmove = "left";        
        }
        else if(this.cursors.right.isDown){
            this.char.animations.play('moveRight', 15, true);
        //    this.char.body.velocity.y = 0;
            this.char.body.velocity.x = 100;
            this.lastmove = "right";
        }
        else if(this.cursors.up.isDown){
            this.char.animations.play('moveUp', 15, true);
          //  this.char.body.velocity.x = 0;
            this.char.body.velocity.y = -100;
            this.lastmove = "up"
        }
        else if(this.cursors.down.isDown){
            this.char.animations.play('moveDown', 15, true);
         //   this.char.body.velocity.x = 0;
            this.char.body.velocity.y = 100;
            this.lastmove = "down";
        }
        else {
            if(this.lastmove == "down"){
                if(Math.ceil((this.char.position.y)/30) == Math.floor(0.1+((this.char.position.y)/30))){
                    this.char.body.velocity.x = 0; //needed to add both to stop sliding
                    this.char.body.velocity.y = 0;
                    this.char.position.y = 30*(Math.round(0.3+((this.char.position.y)/30)))
                    this.char.animations.stop(null, true);
                    this.char.frame=2;
                }
            }
            else if(this.lastmove == "up"){
                if(Math.ceil((this.char.position.y)/30) == Math.floor(0.1+((this.char.position.y)/30))){
                    this.char.body.velocity.x = 0;
                    this.char.body.velocity.y = 0;
                    this.char.position.y = 30*(Math.round(0.3+((this.char.position.y)/30)))
                    this.char.animations.stop(null, true);
                    this.char.frame=11;
                }
            }
            else if(this.lastmove == "right"){
                if(Math.ceil((this.char.position.x)/30) == Math.floor(0.1+((this.char.position.x)/30))){
                    this.char.body.velocity.x = 0;
                    this.char.body.velocity.y = 0;
                    this.char.position.x = 30*(Math.round(0.3+((this.char.position.x)/30)))
                    this.char.animations.stop(null, true);
                    this.char.frame=8;
                }
            }
            else if(this.lastmove == "left"){
                if(Math.ceil((this.char.position.x)/30) == Math.floor(0.1+((this.char.position.x)/30))){
                    this.char.body.velocity.x = 0;
                    this.char.body.velocity.y = 0;
                    this.char.position.x = 30*(Math.round(0.4+((this.char.position.x)/30)))
                    this.char.animations.stop(null, true);
                    this.char.frame=5;
                }
            }

        }

    },
    
    update: function(){
        this.physics.arcade.collide(this.char, this.layer);
        this.physics.arcade.collide(this.char, this.stone1);
        this.physics.arcade.collide(this.char, this.stone2);
        
        this.checkKeys();
        
        if(Phaser.Rectangle.intersects(this.char.getBounds(), this.goal.getBounds())){
            this.finish = this.add.button(70, 120, 'finish', this.finishButton, this);
            console.log("yai")
        }
    }
    
};
function testFloor2(){
    this.info.kill();
    if(Phaser.Rectangle.intersects(this.char.getBounds(), this.lever1.getBounds())){
        console.log("LEVER1 BUTTON")
        if(this.stone1.alive){
            this.stone1.kill();
            this.lever1.loadTexture('movinglever2', 0, false);
            console.log("Stone1 is removed");
        }
        else{
            this.stone1 = this.add.sprite(210, 240, 'blockStone');
            this.stone1.reset(210, 240);
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
            this.stone2.reset(270, 390); 
            this.lever2.loadTexture('movinglever1', 0, false);
            console.log("Stone2 is added");
        } 
    }
}
    