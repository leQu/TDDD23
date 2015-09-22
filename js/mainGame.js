var game = new Phaser.Game(595, 420, Phaser.CANVAS, 'game');

var PhaserGame = function (game){
    
    this.map = null;
    this.layer = null;
    this.char = null;
    
    this.speed = 100;
    
}
PhaserGame.prototype = {
    init: function(){
        this.physics.startSystem(Phaser.Physics.ARCADE);
    },

    preload: function(){
        this.load.tilemap('map', 'assets/maps/firstMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/images/tibiateset.png');
        this.load.image('char', 'assets/images/charSquare.png');
    },

    create: function(){
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('tibiateset', 'tiles');
        
        this.layer = this.map.createLayer('wallsbin');        
        this.map.setCollision(0, true, this.layer);
        
        this.char = this.add.sprite(48, 48, 'char');
        this.char.anchor.set(0.5);

        this.physics.arcade.enable(this.char);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.move(Phaser.DOWN);

    },
    
    checkKeys: function () {

    },
    
    move: function(direction) {

        var speed = this.speed;

        if (direction === Phaser.LEFT || direction === Phaser.UP) {
            speed = -speed;
        }

        if (direction === Phaser.LEFT || direction === Phaser.RIGHT) {
            this.char.body.velocity.x = speed;
        } else {
            this.char.body.velocity.y = speed;
        }

        this.add.tween(this.char).to({
            angle: this.getAngle(direction)
        }, 
        this.turnSpeed, "Linear", true);

        this.current = direction;

      },
    
    getAngle: function(to) {

        //  About-face?
        if (this.current === this.opposites[to]) {
          return "180";
        }

        if ((this.current === Phaser.UP && to === Phaser.LEFT) ||
          (this.current === Phaser.DOWN && to === Phaser.RIGHT) ||
          (this.current === Phaser.LEFT && to === Phaser.DOWN) ||
          (this.current === Phaser.RIGHT && to === Phaser.UP)) {
          return "-90";
        }

        return "90";

      },
    
    update: function(){
        
    }
};

game.state.add('Game', PhaserGame, true);