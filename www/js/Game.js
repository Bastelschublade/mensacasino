var Casino = Casino || {}; //create or use existing Object
Casino.Game = function () {};
Casino.Game.prototype = {
    
    preload: function () {
        this.game.time.advancedTiming = true;
    },
    
    create: function () {
        
        //this.bg = this.game.add.sprite(0,0, 'bg');
        Casino.vars = {};
        Casino.vars.running = [false, false, false];
        Casino.vars.inputReady = true;
        Casino.vars.reelNumber = 3;
        Casino.vars.velocity = 20;
        Casino.vars.state = 'ready'; //running reroll finish
        Casino.vars.stopping = new Array(Casino.vars.reelNumber);
        Casino.vars.speed = new Array(Casino.vars.reelNumber);
        Casino.vars.reelSpritesA = new Array(Casino.vars.reelNumber);
        Casino.vars.reelSpritesB = new Array(Casino.vars.reelNumber);
        for(var i=0; i<Casino.vars.reelNumber; i++){
            var rndY = this.game.rnd.integerInRange(0,5)*100;
            Casino.vars.reelSpritesA[i] = this.game.add.sprite(260+i*105, rndY-500, 'reel');
            Casino.vars.reelSpritesB[i] = this.game.add.sprite(260+i*105, rndY, 'reel');
            Casino.vars.speed[i] = 0;
            Casino.vars.stopping[i] = false;
        }
        
        this.mask = this.game.add.sprite(0,0, 'mask');
        this.btnStart = this.game.add.sprite(250, 400, 'btnGreen');
        this.btnStop = this.game.add.sprite(375, 400, 'btnGrey');
        this.btnReroll = this.game.add.sprite(500, 400, 'btnRed');
        this.labelStart = this.game.add.text(250, 350, 'Start');
        this.labelStop = this.game.add.text(400, 350, 'Hit');
        this.labelReroll = this.game.add.text(500, 350, 'Reroll');
        this.btnStart.scale.setTo(1);
        this.btnStop.scale.setTo(1);
        this.btnStart.inputEnabled = true;
        this.btnStop.inputEnabled = true;
        this.btnReroll.inputEnabled = true;
        
        this.btnStart.events.onInputUp.add(function () {
            if(Casino.vars.state == 'ready'){
                Casino.vars.state = 'running';
                Casino.vars.reelSpritesA[2].loadTexture('reel');
                Casino.vars.reelSpritesB[2].loadTexture('reel');
                for(var i=0; i<Casino.vars.running.length; i++){ 
                    Casino.vars.stopping[i] = false;
                    Casino.vars.running[i] = true;
                    Casino.vars.speed[i] = Casino.vars.velocity * (i+1); //last one is fastest
                }
            }
        });
        this.btnStop.events.onInputUp.add(function () {
            for(var i=0; i<Casino.vars.running.length; i++){
                if(!Casino.vars.stopping[i]){
                    Casino.vars.stopping[i] = true;
                    break;
                }
            }
        });
        this.btnReroll.events.onInputUp.add(function(){
            if(Casino.vars.state == 'ready'){
                Casino.vars.reelSpritesA[2].loadTexture('reelH');
                Casino.vars.reelSpritesB[2].loadTexture('reelH');     
                Casino.vars.state = 'running';
                for(var i=0; i<Casino.vars.running.length; i++){ 
                    Casino.vars.stopping[i] = false;
                    Casino.vars.running[i] = true;
                    Casino.vars.speed[i] = Casino.vars.velocity * (i+1); //last one is fastest
                }
            }
            
        });
        
    },
    
    update: function () {
        //die vars vor den funktionen (in prototype setzten um die in allen funct zu verwenden? teilw global?)
        var reelNum = Casino.vars.reelNumber;
        
        for(var i=0; i<reelNum; i++){
            if(Casino.vars.running[i]){
                Casino.vars.reelSpritesA[i].y += Casino.vars.speed[i];
                Casino.vars.reelSpritesB[i].y += Casino.vars.speed[i];
                if(Casino.vars.reelSpritesA[i].y > 500){
                    Casino.vars.reelSpritesA[i].y = Casino.vars.reelSpritesB[i].y-500;
                }
                if(Casino.vars.reelSpritesB[i].y > 500){
                    Casino.vars.reelSpritesB[i].y = Casino.vars.reelSpritesA[i].y-500;
                }
                if(Casino.vars.stopping[i]){
                    if(Casino.vars.speed[i]>0.5){
                        Casino.vars.speed[i] = Casino.vars.speed[i]*0.95;
                    }
                    if((Math.abs(Casino.vars.reelSpritesA[i].y % 100) < 1.5) && Casino.vars.speed[i]<4){
                        console.log('else');
                        Casino.vars.speed[i] = 0;
                        Casino.vars.running[i] = false;
                        if(i == Casino.vars.reelNumber-1){
                            Casino.vars.state = 'ready';
                        }
                        //Casino.vars.stopping[i] =false;
                    }
                }
            }
        }
        
    },
    
    render: function() {
        
    }
}