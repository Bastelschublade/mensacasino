var Casino = Casino || {}; //create or use existing Object
Casino.Preload = function () {};
Casino.Preload.prototype = {
 
    
    preload: function () {
        //show loadscreen
        this.bootImage = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bootImage');
        this.bootImage.anchor.setTo(0.5); //x and y
        this.btnGreen = this.load.image('btnGreen', 'img/btn_green.png');
        this.btnRed = this.load.image('btnRed', 'img/btn_red.png');
        this.btnGrey = this.load.image('btnGrey', 'img/btn_grey.png');
        this.reel = this.load.image('reel', 'img/reel.png');
        this.reelH = this.load.image('reelH', 'img/reel_hard.png');
        //this.bg = this.load.image('bg', 'img/background.png');
        this.mask = this.load.image('mask', 'img/mask.png');
    },
    create: function () {
        //start Game.js after loading finished
        this.state.start('Game');
    }
}