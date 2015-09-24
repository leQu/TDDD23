var game = new Phaser.Game(595, 420, Phaser.CANVAS, 'game');

var PhaserGame = function (game){
    
    this.map = null;
    this.layer = null;
    this.char = null;
    
    this.speed = 50;
    
    this.safetile = 55;
    this.gridsize = 35;
    this.lastmove = null;

        this.threshold = 3;
        this.turnSpeed = 50;

        this.marker = new Phaser.Point();
        this.turnPoint = new Phaser.Point();

        this.directions = [ null, null, null, null, null ];
        this.opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ];

        this.current = Phaser.UP;
        this.turning = Phaser.NONE;

    
}
PhaserGame.prototype = {
    init: function(){
        this.physics.startSystem(Phaser.Physics.ARCADE);
    },

    preload: function(){
        this.load.tilemap('map', 'assets/maps/firstMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/images/tibiateset.png');
        this.load.image('char', 'assets/images/charSquare.png');
        this.load.image('button', 'assets/images/button.png');
    },

    create: function(){
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('tibiateset', 'tiles');
        
        this.layer = this.map.createLayer('Way');
        
        //Kan sätta första parametern till en array med siffror för att ha flera ID
        //EXEMPEL: var wallIDs = ["x", "x", "x"];
       // this.map.setCollision(32, true, this.layer);
        //Löser det problemet med denna, som kolliderar med allf
        this.map.setCollisionByExclusion([this.safetile], true, this.layer);
        
        this.button1 = this.add.sprite(87.5, 87.5, 'button');
        this.button1.anchor.set(0.5);
        this.char = this.add.sprite(122.5, 17.5, 'char');
        this.char.anchor.set(0.5);

        this.physics.arcade.enable(this.char);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.arcade.collide(this.char, this.layer);
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
            if(this.lastmove == "right"){
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

        checkDirection: function (turnTo) {

            if (this.turning === turnTo || this.directions[turnTo] === null || this.directions[turnTo].index !== this.safetile)
            {
                //  Invalid direction if they're already set to turn that way
                //  Or there is no tile there, or the tile isn't index a floor tile
                return;
            }

            //  Check if they want to turn around and can
            if (this.current === this.opposites[turnTo])
            {
                this.move(turnTo);
            }
            else
            {
                this.turning = turnTo;

                this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2);
                this.turnPoint.y = (this.marker.y * this.gridsize) + (this.gridsize / 2);
            }

        },

        turn: function () {

            var cx = Math.floor(this.char.x);
            var cy = Math.floor(this.char.y);

            //  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
            if (!this.math.fuzzyEqual(cx, this.turnPoint.x, this.threshold) || !this.math.fuzzyEqual(cy, this.turnPoint.y, this.threshold))
            {
                return false;
            }

            this.char.x = this.turnPoint.x;
            this.char.y = this.turnPoint.y;

            this.char.body.reset(this.turnPoint.x, this.turnPoint.y);

            this.move(this.turning);

            this.turning = Phaser.NONE;

            return true;

        },

        move: function (direction) {

            var speed = this.speed;

            if (direction === Phaser.LEFT || direction === Phaser.UP)
            {
                speed = -speed;
            }

            if (direction === Phaser.LEFT || direction === Phaser.RIGHT)
            {
                this.char.body.velocity.x = speed;
            }
            else
            {
                this.char.body.velocity.y = speed;
            }

            this.add.tween(this.char).to( { angle: this.getAngle(direction) }, this.turnSpeed, "Linear", true);

            this.current = direction;

        },

        getAngle: function (to) {

            //  About-face?
            if (this.current === this.opposites[to])
            {
                return "180";
            }

            if ((this.current === Phaser.UP && to === Phaser.LEFT) ||
                (this.current === Phaser.DOWN && to === Phaser.RIGHT) ||
                (this.current === Phaser.LEFT && to === Phaser.DOWN) ||
                (this.current === Phaser.RIGHT && to === Phaser.UP))
            {
                return "-90";
            }

            return "90";

        },
    
        pressbutton: function(char, button1){
            console.log("pressed!")
    },
    
    checkOverlap: function(sprite1, sprite2){
        var boundsA = sprite1.getBounds();
        var boundsB = sprite2.getBounds();
        
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },

    update: function() {
          
            this.physics.arcade.collide(this.char, this.layer);
        
            if(Phaser.Rectangle.intersects(this.char.getBounds(), this.button1.getBounds())){
                console.log("Yes")  
            }
            else {
               console.log("No")
            }

            this.marker.x = this.math.snapToFloor(Math.floor(this.char.x), this.gridsize) / this.gridsize;
            this.marker.y = this.math.snapToFloor(Math.floor(this.char.y), this.gridsize) / this.gridsize;

            //  Update our grid sensors
            this.directions[1] = this.map.getTileLeft(this.layer.index, this.marker.x, this.marker.y);
            this.directions[2] = this.map.getTileRight(this.layer.index, this.marker.x, this.marker.y);
            this.directions[3] = this.map.getTileAbove(this.layer.index, this.marker.x, this.marker.y);
            this.directions[4] = this.map.getTileBelow(this.layer.index, this.marker.x, this.marker.y);

            this.checkKeys();

            if (this.turning !== Phaser.NONE)
            {
                this.turn();
            }

    },


};

game.state.add('Game', PhaserGame, true);
