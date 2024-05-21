import Phaser from 'phaser';

export default class InstructionsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InstructionsScene' });
    }

    preload() {
        // 必要なアセットをここで読み込む
    }

    create() {
        this.add.text(400, 100, '遊び方', { fontSize: '64px', fill: '#ffffff' }).setOrigin(0.5);

        this.input.keyboard.once('keydown-ESC', () => {
            this.scene.start('StartScene');
        });
    }
}
