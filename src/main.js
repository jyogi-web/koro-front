import Phaser from 'phaser';
import StartScene from './scenes/StartScene';
import GameScene from './scenes/GameScene';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [StartScene, GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
