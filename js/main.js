var game;

game = new Phaser.Game(450, 450, Phaser.CANVAS, 'game');

game.state.add('loadingScreen', loadingScreen);
game.state.add('Menu', Menu);
game.state.add('prelvlOne', prelvlOne);
game.state.add('lvlOne', lvlOne);
game.state.add('lvlTwo', lvlTwo);
game.state.add('lvlThree',lvlThree);
game.state.add('lvlFour', lvlFour);
game.state.add('chooseLvl', chooseLvl);
game.state.add('prelvlThree', prelvlThree);
game.state.add('testingNew', testingNew);

game.state.start('loadingScreen');

