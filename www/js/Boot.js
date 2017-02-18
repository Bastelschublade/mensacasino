var Casino = Casino || {}; //create or use existing Object
Casino.Boot = function () {}; //not that sure just creating subobject/ function?

// general settings and preload loading screen
Casino.Boot.prototype = { //prototype object created
    preload: function () {
        var logo;
        logo = this.load.image('bootImage', 'img/logo.png');
    },
    create: function () {
        //create white background for loading screen
        this.game.stage.backgroundColor = '#000';
        //keep ratio max until x/y hit border, and center x/y
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        //set screensize automatic
        this.scale.setScreenSize(true);
        this.state.start('Load');
    }
};