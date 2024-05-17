import Phaser from 'phaser';

export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        // 必要なアセットをここで読み込む
    }

    create() {
        this.add.text(400, 200, 'Maze Game', { fontSize: '64px', fill: '#ffffff' }).setOrigin(0.5);

        const startButton = this.add.text(400, 400, 'Start Game', { fontSize: '32px', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => this.startGame());
        startButton.setOrigin(0.5);
    }

    startGame() {
        this.scene.start('GameScene');
    }
}
