var mazeImage;

var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
	preload: function(){
		game.load.image('maze', 'assets/images/maze1.png')
	},
	create: function(){

	},
	update: function(){

	}
};

game.state.add('GameState', GameState);
game.state.start('GameState');