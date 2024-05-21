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

        this.buttons = [
            this.createDifficultyButton(400, 300, 'Easy', 'GameSceneEasy'),
            // this.createDifficultyButton(400, 400, 'Medium', 'GameSceneMedium'),
            this.createDifficultyButton(400, 500, 'Hard', 'GameScene')
        ];

        this.selectedButtonIndex = 0;
        this.highlightButton(this.buttons[this.selectedButtonIndex]);

        this.input.keyboard.on('keydown-UP', this.moveSelectionUp, this);
        this.input.keyboard.on('keydown-DOWN', this.moveSelectionDown, this);
        this.input.keyboard.on('keydown-W', this.moveSelectionUp, this);
        this.input.keyboard.on('keydown-S', this.moveSelectionDown, this);
        this.input.keyboard.on('keydown-ENTER', this.selectButton, this);
        this.input.keyboard.on('keydown-SPACE', this.selectButton, this);
    }

    createDifficultyButton(x, y, text, sceneKey) {
        const button = this.add.text(x, y, text, { fontSize: '32px', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => this.startGame(sceneKey));
        button.setOrigin(0.5);
        button.sceneKey = sceneKey;
        return button;
    }

    highlightButton(button) {
        button.setStyle({ fill: '#ff0' });
    }

    clearHighlightButton(button) {
        button.setStyle({ fill: '#ffffff' });
    }

    moveSelectionUp() {
        this.clearHighlightButton(this.buttons[this.selectedButtonIndex]);
        this.selectedButtonIndex = (this.selectedButtonIndex > 0) ? this.selectedButtonIndex - 1 : this.buttons.length - 1;
        this.highlightButton(this.buttons[this.selectedButtonIndex]);
    }

    moveSelectionDown() {
        this.clearHighlightButton(this.buttons[this.selectedButtonIndex]);
        this.selectedButtonIndex = (this.selectedButtonIndex < this.buttons.length - 1) ? this.selectedButtonIndex + 1 : 0;
        this.highlightButton(this.buttons[this.selectedButtonIndex]);
    }

    selectButton() {
        const button = this.buttons[this.selectedButtonIndex];
        this.startGame(button.sceneKey);
    }

    startGame(sceneKey) {
        this.scene.start(sceneKey);
    }
}
