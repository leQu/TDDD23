var game = new Phaser.Game(595, 420, Phaser.CANVAS, 'game');

var PhaserGame = function (game){
    
    this.map = null;
    this.layer = null;
    this.overlayer = null;
    this.char = null;
    
    this.speed = 50;
    
    this.safetile = 55;
    this.gridsize = 35;
    this.lastmove = null;
    this.lastmove = null;

}
PhaserGame.prototype = {
    init: function(){
        this.physics.startSystem(Phaser.Physics.ARCADE);
    },

    preload: function(){
        this.load.tilemap('map', 'assets/maps/firstMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/images/tibiateset.png');
        this.load.image('char', 'assets/images/charSquare.png');
        this.load.image('falsewallButton', 'assets/images/falsewallButtonbutton.png');
        this.load.image('falsewall', 'assets/images/falsewall.png');
        this.load.image('hole', 'assets/images/hole.png');
    },

    create: function(){
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('tibiateset', 'tiles');
        
        this.overlayer = this.map.createLayer('wallsbin');
        this.layer = this.map.createLayer('Way');
        
        //Kan sätta första parametern till en array med siffror för att ha flera ID
        //EXEMPEL: var wallIDs = ["x", "x", "x"];
       // this.map.setCollision(32, true, this.layer);
        //Löser det problemet med denna, som kolliderar med allf
        this.map.setCollisionByExclusion([this.safetile], true, this.layer);
        
        this.falsewallButton = this.add.sprite(87.5, 87.5, 'falsewallButton');
        this.hole = this.add.sprite(87.5, 227.5,'hole')
        this.hole.anchor.set(0.5);
        this.falsewallButton.anchor.set(0.5);
        this.char = this.add.sprite(122.5, 17.5, 'char');
        this.char.anchor.set(0.5);
        this.falsewall = this.add.sprite(227.5, 87.5, 'falsewall');
        this.falsewall.anchor.set(0.5);
        
        this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.fireButton.onDown.add(testFloor, this)

        this.physics.arcade.enable([this.char, this.falsewall]);

        this.cursors = this.input.keyboard.createCursorKeys();
        
       // this.physics.arcade.collide(this.char, this.falsewall);
        this.falsewall.body.immovable = true;
       // this.physics.arcade.collide(this.char, this.layer);
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
                //console.log(Math.floor((this.char.position.y)/35))
                //console.log(Math.ceil((this.char.position.y)/35))
                if(Math.ceil((this.char.position.y)/35) == Math.round((this.char.position.y)/35)){
                    this.char.body.velocity.y = 0;
                    this.char.position.y = 17.5+35*(Math.floor((this.char.position.y)/35))
                }
            }
            else if(this.lastmove == "up"){
                if(Math.floor((this.char.position.y)/35) == Math.round((this.char.position.y)/35)){
                    this.char.body.velocity.y = 0;
                    this.char.position.y = 17.5+35*(Math.floor((this.char.position.y)/35))
                }
            }
            else if(this.lastmove == "right"){
                if(Math.ceil((this.char.position.x)/35) == Math.round((this.char.position.x)/35)){
                    this.char.body.velocity.x = 0;
                    this.char.position.x = 17.5+35*(Math.floor((this.char.position.x)/35))
                }
            }
            else if(this.lastmove == "left"){
                if(Math.floor((this.char.position.x)/35) == Math.round((this.char.position.x)/35)){
                    this.char.body.velocity.x = 0;
                    this.char.position.x = 17.5+35*(Math.floor((this.char.position.x)/35))
                }
            }

        }

    },

    
    update: function() {
        
        this.physics.arcade.collide(this.char, this.falsewall);
        this.physics.arcade.collide(this.char, this.layer);

        //this.marker.x = this.math.snapToFloor(Math.floor(this.char.x), this.gridsize) / this.gridsize;
        //this.marker.y = this.math.snapToFloor(Math.floor(this.char.y), this.gridsize) / this.gridsize;
        
        this.checkKeys();

        if(Phaser.Rectangle.intersects(this.char.getBounds(), this.hole.getBounds())){
            this.overlayer.bringToTop();
            this.char.bringToTop();
        }
        else {
         this.overlayer.sendToBack();   
        }

    },
};

function testFloor(){
    if(Phaser.Rectangle.intersects(this.char.getBounds(), this.falsewallButton.getBounds())){
        console.log("Falsewall BUTTON")
        if(this.falsewall.alive){
            this.char.reset(87.5, 87.5);
            this.falsewall.kill();
            console.log("Wall is removed");
        }
        else{
            this.falsewall.body.x = 122.5;
            this.falsewall.reset(227.5, 87.5);  
            console.log("Wall is added");
        }
        
    }
    
    else if(1==2){
        console.log("Roped");
        //if standing on sqare change layout and change safetiles and thus change which tiles can be walked on. 
        
        
    }
    else if(1==2){
        //Another action floor.   
    }
    else {
        console.log("No")
    }
}

game.state.add('Game', PhaserGame, true);
