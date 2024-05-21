import Phaser from 'phaser';
import StartScene from './scenes/StartScene';
import GameScene from './scenes/GameScene';
import GameSceneEasy from './scenes/GameSceneEasy';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [StartScene, GameScene, GameSceneEasy],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
