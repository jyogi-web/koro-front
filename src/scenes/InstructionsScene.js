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

        this.add.text(400, 200, '操作方法', { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(400, 250, '矢印キーまたはWASDで移動します。', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(400, 300, 'コインを10枚集めて障害物を避けましょう！', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);

        this.add.text(400, 350, 'ゲームクリア', { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(400, 400, 'すべてのコインを集めて、緑色の場所に行けばゲームクリアです。', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);

        this.add.text(400, 500, 'スタートに戻る方はESCを押してください ', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);

        this.input.keyboard.once('keydown-ESC', () => {
            this.scene.start('StartScene');
        });
    }
}
