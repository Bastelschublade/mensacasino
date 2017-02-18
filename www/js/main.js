var Casino = Casino || {};

Casino.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

Casino.game.state.add('Boot', Casino.Boot);
Casino.game.state.add('Load', Casino.Preload);
Casino.game.state.add('Game', Casino.Game);
Casino.game.state.start('Boot');