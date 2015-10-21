var prelvlThree = {    
        
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
        this.load.tilemap('map', 'assets/maps/prelvlThree.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/images/sourceimage3.png');
        this.load.image('char', 'assets/images/tempChar2.png');
        this.load.image('goal', 'assets/images/goal.png');
        this.load.spritesheet('movinglever1', 'assets/images/movinglever1.png');
        this.load.spritesheet('movinglever2', 'assets/images/movinglever2.png');
        this.load.image('blockStone', 'assets/images/blockStone.png');
        this.load.image('leverStone', 'assets/images/stoneLever.png');
        this.load.image('info', 'assets/images/Screens/INFOlvlThree.png');
        this.load.image('finish', 'assets/images/Screens/finishLevel.png');
        this.load.spritesheet('charAll', 'assets/images/characterSprites/SpriteALL.png', 30, 30, 12);
    },

    create: function() {
        
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('sourceimage3', 'tiles');
        
        this.layer = this.map.createLayer('mainlayer');
        this.overlayer = this.map.createLayer('seclayer');

        this.map.setCollisionByExclusion([this.safetile], true, this.layer);
        
        this.goal = this.add.sprite(120, 450, 'goal');
        this.leverStone = this.add.sprite(150, 60, 'goal');
        
        this.char = this.add.sprite(210, 30, 'charAll');
        
        this.char.animations.add('moveUp', [9,10], 10, true);
        this.char.animations.add('moveDown', [0,1], 10, true);
        this.char.animations.add('moveRight', [6,7], 10, true);
        this.char.animations.add('moveLeft', [3,4], 10, true);
        
        this.triggerButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.triggerButton.onDown.add(testFloor3, this)
        this.info = this.add.button(50, 120, 'info', this.buttonpressed, this);
        
        this.physics.arcade.enable([this.char, this.goal, this.leverStone]);
        this.char.body.collideWorldBounds = true;
        
        this.leverStone.body.immovable = true;

        this.cursors = this.input.keyboard.createCursorKeys();
        
    },
    
    buttonpressed: function(){
        this.info.kill();
    },
    
    checkKeys: function(){
        
        if (this.cursors.left.isDown){
            this.char.animations.play('moveLeft', 15, true);
        //    this.char.body.velocity.y = 0; //Needed to make him fucking stop sliding!
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
         //   this.char.body.velocity.x = 0;
            this.char.body.velocity.y = -100;
            this.lastmove = "up"
        }
        else if(this.cursors.down.isDown){
            this.char.animations.play('moveDown', 15, true);
        //    this.char.body.velocity.x = 0;
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
    
    finishButton: function(){
        game.state.start('lvlThree');
    },
    
    update: function(){
        this.physics.arcade.collide(this.char, this.layer);
        this.physics.arcade.collide(this.char, this.leverStone);
        
        this.checkKeys();
        
        if(Phaser.Rectangle.intersects(this.char.getBounds(), this.leverStone.getBounds())){
            console.log("working")
            this.overlayer.sendToBack();
            
        }
        else if(Phaser.Rectangle.intersects(this.char.getBounds(), this.goal.getBounds())){
            this.finish = this.add.button(70, 120, 'finish', this.finishButton, this);   
        }   
        //Needed to keep the infoquare on top untill it dies.
        else if(!this.info.alive) {
            this.overlayer.bringToTop();
            this.char.bringToTop();
        }
        else{
            this.overlayer.bringToTop();
            this.char.bringToTop();
            this.info.bringToTop();   
        }
    }
    
};

function testFloor3(){
    this.info.kill();
}