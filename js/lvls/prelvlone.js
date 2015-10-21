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
        this.marker = new Phaser.Point();
        this.directions = [null, null, null, null, null];
        
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
        this.load.spritesheet('charAll', 'assets/images/characterSprites/SpriteALL.png', 30, 30, 12);
    },

    create: function() {
        
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('sourceimage', 'tiles');
        
        this.layer = this.map.createLayer('prelvlonelayer');

        this.map.setCollisionByExclusion([this.safetile], true, this.layer);
        
        this.goal = this.add.sprite(450, 300, 'goal');
        this.char = this.add.sprite(60, 120, 'charAll');
        
        
        this.char.animations.add('moveUp', [9,10], 10, true);
        this.char.animations.add('moveDown', [0,1], 10, true);
        this.char.animations.add('moveRight', [6,7], 10, true);
        this.char.animations.add('moveLeft', [3,4], 10, true);
        
        
        this.stone = this.add.sprite(270, 180, 'stone');
        this.info = this.add.button(70, 120, 'info', this.buttonpressed, this);
        
        this.physics.arcade.enable([this.char, this.goal, this.stone]);
        this.char.body.collideWorldBounds = true;
        
        this.stone.body.immovable = true;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
        
        this.marker.x = this.math.snapToFloor(Math.floor(this.char.x), this.gridsize) / this.gridsize;
        this.marker.y = this.math.snapToFloor(Math.floor(this.char.y), this.gridsize) / this.gridsize;
        
    },
    
    finishButton: function(){
        game.state.start('lvlOne');  
    },
    
    buttonpressed: function(){
        this.info.destroy();
    },
    
    checkKeys: function(){
        
        //Add criteria that make sure you can't turn if the square is not walkable. Get id or something of the tile to the X and then try to turn.
        
        if (this.cursors.left.isDown && this.directions[1].index == this.safetile){
            this.char.animations.play('moveLeft', 15, true);
            this.char.body.velocity.y = 0; //Needed to make him fucking stop sliding!
            this.char.body.velocity.x = -100;
            this.marker.x = this.math.snapToFloor(Math.ceil(this.char.x), this.gridsize) / this.gridsize;
            this.lastmove = "left";        
        }
        else if(this.cursors.right.isDown && this.directions[2].index == this.safetile){
            this.char.animations.play('moveRight', 15, true);
            this.char.body.velocity.y = 0;
            this.char.body.velocity.x = 100;
            this.marker.x = this.math.snapToFloor(Math.floor(this.char.x), this.gridsize) / this.gridsize;
            this.lastmove = "right";
        }
        else if(this.cursors.up.isDown && this.directions[3].index == this.safetile){
            this.char.animations.play('moveUp', 15, true);
            this.char.body.velocity.x = 0;
            this.char.body.velocity.y = -100;
            this.marker.y = this.math.snapToFloor(Math.ceil(this.char.y), this.gridsize) / this.gridsize;
            this.lastmove = "up"
        }
        else if(this.cursors.down.isDown && this.directions[4].index == this.safetile){
            this.char.animations.play('moveDown', 15, true);
            this.char.body.velocity.x = 0;
            this.char.body.velocity.y = 100;
            this.marker.y = this.math.snapToFloor(Math.floor(this.char.y), this.gridsize) / this.gridsize;
            this.lastmove = "down";
        }
        
        else {       
            if(this.lastmove == "down"){
                if(Math.ceil((this.char.position.y)/30) == Math.floor(0.1+((this.char.position.y)/30))){
                    this.char.body.velocity.x = 0; //needed to add both to stop sliding
                    this.char.body.velocity.y = 0;
                    this.char.y = this.math.snapToFloor(Math.round(this.char.y/30)*30, this.gridsize);
                    this.char.animations.stop(null, true);
                    this.char.frame=2;
                    this.marker.y = this.math.snapToFloor(Math.floor(this.char.y), this.gridsize) / this.gridsize;
                    this.char.position.y = Math.round(this.char.body.y/30)*30;
                //   this.checkCollisions();
                }
            }
            else if(this.lastmove == "up"){
                if(Math.ceil((this.char.position.y)/30) == Math.floor(0.1+((this.char.position.y)/30))){
                    this.char.body.velocity.x = 0;
                    this.char.body.velocity.y = 0;
                    this.char.y = this.math.snapToFloor(Math.round(this.char.y/30)*30, this.gridsize);
                    this.char.animations.stop(null, true);
                    this.char.frame=11;
                    this.marker.y = this.math.snapToFloor(Math.ceil(this.char.y), this.gridsize) / this.gridsize;
                 //   this.checkCollisions();
                }
            }
            else if(this.lastmove == "right"){
                if(Math.ceil((this.char.position.x)/30) == Math.floor(0.1+((this.char.position.x)/30))){
                    this.char.body.velocity.x = 0;
                    this.char.body.velocity.y = 0;
                    this.char.x = this.math.snapToFloor(Math.round(this.char.x/30)*30, this.gridsize);
                    this.char.animations.stop(null, true);
                    this.char.frame=8;
                    this.marker.x = this.math.snapToFloor(Math.floor(this.char.x), this.gridsize) / this.gridsize;
                   // this.checkCollisions();
                }
            }
            else if(this.lastmove == "left"){
                if(Math.ceil((this.char.position.x)/30) == Math.floor(0.1+((this.char.position.x)/30))){
                    this.char.body.velocity.x = 0;
                    this.char.body.velocity.y = 0;
                    this.char.x = this.math.snapToFloor(Math.round(this.char.x/30)*30, this.gridsize);
                    this.char.animations.stop(null, true);
                    this.char.frame=5;
                    this.marker.x = this.math.snapToFloor(Math.ceil(this.char.x), this.gridsize) / this.gridsize;
                   // this.checkCollisions();
                }
            }

        }
        

    },
    
    update: function(){
        this.physics.arcade.collide(this.char, this.layer);
        this.physics.arcade.collide(this.char, this.stone);
        
        if(this.map.getTileLeft(this.layer.index, this.marker.x, this.marker.y) && this.map.getTileRight(this.layer.index, this.marker.x, this.marker.y) && this.map.getTileAbove(this.layer.index, this.marker.x, this.marker.y) && this.map.getTileBelow(this.layer.index, this.marker.x, this.marker.y)){
        
        this.directions[1] = this.map.getTileLeft(this.layer.index, this.marker.x, this.marker.y);
        this.directions[2] = this.map.getTileRight(this.layer.index, this.marker.x, this.marker.y);
        this.directions[3] = this.map.getTileAbove(this.layer.index, this.marker.x, this.marker.y);
        this.directions[4] = this.map.getTileBelow(this.layer.index, this.marker.x, this.marker.y);
        
        }
        this.checkKeys();
        
        if(this.counter == 5){
            this.info.kill();   
        }
        
        if(Phaser.Rectangle.intersects(this.char.getBounds(), this.goal.getBounds())){
            console.log("yai")
            this.finish = this.add.button(70, 120, 'finish', this.finishButton, this);
        }
    },
    
    checkCollisions: function(){
        console.log();
    },
    
    updateCounter: function(){
        this.counter++;
    }
    
};