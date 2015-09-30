var Menu = {

    preload: function() {
        //load in the sprite for the "menu" aswell as possible sprite buttons that I'll use.
        game.load.image('menu', 'assets/images/Screens/menuScreen.png');
        
        game.load.spritesheet('lvl', 'assets/images/Screens/menulvlButton.png');
        game.load.spritesheet('start', 'assets/images/Screens/menuStartButton.png');
        game.load.spritesheet('credits', 'assets/images/Screens/menuCreditsButton.png');
        
        game.load.spritesheet('LITTlvl', 'assets/images/Screens/LITTmenulvlButton.png');
        game.load.spritesheet('LITTstart', 'assets/images/Screens/LITTmenuStartButton.png');
        game.load.spritesheet('LITTcredits', 'assets/images/Screens/LITTmenuCreditsButton.png');
    },

    create: function() {
        this.add.sprite(0, 0, 'menu');
        //just added "this" - remove if issue
        this.start = this.add.button(120, 210, 'start', this.startGame, this);
        this.start.onInputOver.add(this.overStart, this);
        this.start.onInputOut.add(this.outStart, this);
        
        this.lvl = this.add.button(120, 270, 'lvl', this.startLvls, this);
        this.lvl.onInputOver.add(this.overLvls, this);
        this.lvl.onInputOut.add(this.outLvls, this);
        
        this.credits = this.add.button(120, 330, 'credits', this.startCredits, this);
        this.credits.onInputOver.add(this.overCredits, this);
        this.credits.onInputOut.add(this.outCredits, this);
    },
    
    update: function(){
        
    },
    
    startGame: function(){
        console.log("Starting");
        game.state.start('prelvlOne');   
    },
    
    startLvls: function(){
        console.log("start lvls!");   
    },
    
    startCredits: function(){
        game.state.start('loadingScreen')
        console.log("start credits!");   
    },
    
    overStart: function(){
        console.log("Over!")
        this.start.loadTexture('LITTstart', 0, false);
    },
    
    outStart: function(){
        this.start.loadTexture('start', 0, false);
    },
        
    overLvls: function(){
        console.log("Over!")
        this.lvl.loadTexture('LITTlvl', 0, false);
    },
    
    outLvls: function(){
        this.lvl.loadTexture('lvl', 0, false);
    },
        
    overCredits: function(){
        console.log("Over!")
        this.credits.loadTexture('LITTcredits', 0, false);
    },
    
    outCredits: function(){
        this.credits.loadTexture('credits', 0, false);
    }
};
    