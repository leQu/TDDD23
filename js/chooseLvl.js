var chooseLvl = {
    
    preload: function() {
        //load in the sprite for the "menu" aswell as possible sprite buttons that I'll use.
        game.load.image('menu', 'assets/images/testmenu.png');
    },

    create: function() {
        //add the sprites, make them interatct with the keyboard. arrows and spacebar
        this.add.sprite(0, 0, 'menu');
    },
    
    update: function(){
        
    }
};