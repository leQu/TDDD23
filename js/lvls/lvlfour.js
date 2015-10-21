var lvlFour = {    
        
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
        this.load.tilemap('map', 'assets/maps/lvlFourMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/images/sourceimage.png');
        this.load.image('rollStone', 'assets/images/tempChar2.png');
        this.load.image('stone', 'assets/images/blockStone.png');
        this.load.image('goal', 'assets/images/goal.png');
        this.load.image('info', 'assets/images/Screens/INFOprelvlOne.png');
        this.load.image('finish', 'assets/images/Screens/finishLevel.png');
        this.load.image('lever', 'assets/images/Lever.png');
        this.load.spritesheet('charAll', 'assets/images/characterSprites/SpriteALL.png', 30, 30, 12);
    },

    create: function() {
        
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('sourceimage', 'tiles');
        
        this.layer = this.map.createLayer('main');

        this.map.setCollisionByExclusion([this.safetile], true, this.layer);
        
        this.goal = this.add.sprite(360, 450, 'goal');
        this.lever = this.add.sprite(330, 240, 'lever');
        this.char = this.add.sprite(90, 210, 'charAll');
        this.rollstone = this.add.sprite(240, 240, 'rollStone');
        
        
        this.char.animations.add('moveUp', [9,10], 10, true);
        this.char.animations.add('moveDown', [0,1], 10, true);
        this.char.animations.add('moveRight', [6,7], 10, true);
        this.char.animations.add('moveLeft', [3,4], 10, true);
        
        
        this.stone = this.add.sprite(360, 390, 'stone');
        
        this.physics.arcade.enable([this.char, this.goal, this.stone, this.rollstone]);
        this.char.body.collideWorldBounds = true;
        
        this.stone.body.immovable = true;

        this.cursors = this.input.keyboard.createCursorKeys();
        
    },
    
    finishButton: function(){
        game.state.start('Menu');  
    },
    
    checkKeys: function(){
        
        if (this.cursors.left.isDown){
            this.char.animations.play('moveLeft', 15, true);
            //this.char.body.velocity.y = 0; //Needed to make him fucking stop sliding!
            this.char.body.velocity.x = -100;
            this.lastmove = "left";        
        }
        else if(this.cursors.right.isDown){
            this.char.animations.play('moveRight', 15, true);
           // this.char.body.velocity.y = 0;
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
          //  this.char.body.velocity.x = 0;
            this.char.body.velocity.y = 100;
            this.lastmove = "down";
        }
        else {
            if(this.lastmove == "down"){
                if(Math.ceil((this.char.position.y)/30) == Math.floor(0.1+((this.char.position.y)/30))){
                //    this.char.body.velocity.x = 0; //needed to add both to stop sliding
                    this.char.body.velocity.y = 0;
                    this.char.position.y = 30*(Math.round(0.3+((this.char.position.y)/30)))
                    this.char.animations.stop(null, true);
                    this.char.frame=2;
                }
            }
            else if(this.lastmove == "up"){
                if(Math.ceil((this.char.position.y)/30) == Math.floor(0.1+((this.char.position.y)/30))){
                //    this.char.body.velocity.x = 0;
                    this.char.body.velocity.y = 0;
                    this.char.position.y = 30*(Math.round(0.3+((this.char.position.y)/30)))
                    this.char.animations.stop(null, true);
                    this.char.frame=11;
                }
            }
            else if(this.lastmove == "right"){
                if(Math.ceil((this.char.position.x)/30) == Math.floor(0.1+((this.char.position.x)/30))){
                    this.char.body.velocity.x = 0;
               //     this.char.body.velocity.y = 0;
                    this.char.position.x = 30*(Math.round(0.3+((this.char.position.x)/30)))
                    this.char.animations.stop(null, true);
                    this.char.frame=8;
                }
            }
            else if(this.lastmove == "left"){
                if(Math.ceil((this.char.position.x)/30) == Math.floor(0.1+((this.char.position.x)/30))){
                    this.char.body.velocity.x = 0;
                //    this.char.body.velocity.y = 0;
                    this.char.position.x = 30*(Math.round(0.4+((this.char.position.x)/30)))
                    this.char.animations.stop(null, true);
                    this.char.frame=5;
                }
            }

        }

    },
    
    update: function(){
        
        this.physics.arcade.collide(this.char, this.layer);
        this.physics.arcade.collide(this.char, this.stone);
        this.physics.arcade.collide(this.rollstone, this.layer);
        this.physics.arcade.collide(this.char, this.rollstone);
        
        this.checkKeys();
        
        if(this.char.getBounds().x>310 && this.char.getBounds().y<270){
            this.stone.kill();
            
        }
        else if(this.rollstone.getBounds().x>310){
            this.stone.kill();
        }
        else if(this.rollstone.getBounds().x<200){
            game.state.start('lvlFour')
        }
  
        else if(!this.stone.alive) {
            this.stone.reset(360, 390); 
        }
        
        if(Phaser.Rectangle.intersects(this.char.getBounds(), this.goal.getBounds())){
            console.log("yai")
            this.finish = this.add.button(70, 120, 'finish', this.finishButton, this);
        }
    }   
};
    