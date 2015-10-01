var chooseLvl = {
    
    preload: function() {
        //load in the sprite for the "menu" aswell as possible sprite buttons that I'll use.
        game.load.image('lvls', 'assets/maps/chooseLvl.png');
        game.load.image('lvlpreOne', 'assets/maps/miniprelvlOneMap.png');
        game.load.image('lvlOne', 'assets/maps/minilvlOneMap.png');
        game.load.image('lvlTwo', 'assets/maps/minilvlTwoMap.png');
        game.load.image('lvlThree', 'assets/maps/minilvlThreeMap.png');
        game.load.spritesheet('backButton', 'assets/images/backButton.png');
        game.load.spritesheet('LITTbackButton', 'assets/images/LITTbackButton.png');
    },

    create: function() {
        this.add.sprite(0, 0, 'lvls');
        this.add.button(67, 67, 'lvlpreOne', this.preButton, this);
        this.add.button(307, 67, 'lvlOne', this.oneButton, this);
        this.add.button(67, 247, 'lvlTwo', this.twoButton, this);
        this.add.button(307, 247, 'lvlThree', this.threeButton, this);
        
        this.back = this.add.button(-8, 383, 'backButton', this.goBack, this);
        this.back.onInputOver.add(this.overBack, this);
        this.back.onInputOut.add(this.outBack, this);
    },
    
    update: function(){
        
    },
    
    overBack: function(){
        this.back.loadTexture('LITTbackButton', 0, false);
    },
    
    outBack: function(){
        this.back.loadTexture('backButton', 0, false);
    },
    
    preButton: function(){
        game.state.start('prelvlOne');
    },
    
    oneButton: function(){
        game.state.start('lvlOne');
        
    },
    
    twoButton: function(){
        game.state.start('lvlTwo');
    },
    
    threeButton: function(){
        game.state.start('lvlThree');
    },
    
    goBack: function(){
        game.state.start('Menu');    
    }
};