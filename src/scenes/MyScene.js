import Phaser from 'phaser';

class MyScene extends Phaser.Scene {
    constructor() {
        super({ key: 'myscene' });
    }

    preload() {
        this.load.setBaseURL('https://labs.phaser.io');

        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    }

    create() {
        this.add.image(400, 300, 'sky');
        // logoを追加し物理特性を設定
        const logo = this.physics.add.image(400, 100, 'logo');

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

    }
}
export default MyScene;

