import Phaser from 'phaser';

export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        // 必要なアセットをここで読み込む
    }

    create() {
        this.add.text(400, 100, '意地の悪いゲーム', { fontSize: '64px', fill: '#ffffff' }).setOrigin(0.5);

        this.mainMenuButtons = [
            this.createMainMenuButton(400, 300, 'プレイ', this.showDifficultyMenu.bind(this)),
            this.createMainMenuButton(400, 400, '遊び方', this.showInstructions.bind(this))
        ];

        this.difficultyButtons = [
            this.createDifficultyButton(400, 300, 'Easy', 'GameSceneEasy'),
            // this.createDifficultyButton(400, 400, 'Medium', 'GameSceneMedium'),
            this.createDifficultyButton(400, 500, 'Hard', 'GameScene')
        ];

        this.selectedButtonIndex = 0;
        this.buttons = this.mainMenuButtons;
        this.highlightButton(this.buttons[this.selectedButtonIndex]);

        this.input.keyboard.on('keydown-UP', this.moveSelectionUp, this);
        this.input.keyboard.on('keydown-DOWN', this.moveSelectionDown, this);
        this.input.keyboard.on('keydown-W', this.moveSelectionUp, this);
        this.input.keyboard.on('keydown-S', this.moveSelectionDown, this);
        this.input.keyboard.on('keydown-ENTER', this.selectButton, this);
        this.input.keyboard.on('keydown-SPACE', this.selectButton, this);
    }

    createMainMenuButton(x, y, text, onClick) {
        const button = this.add.text(x, y, text, { fontSize: '32px', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', onClick);
        button.setOrigin(0.5);
        return button;
    }

    createDifficultyButton(x, y, text, sceneKey) {
        const button = this.add.text(x, y, text, { fontSize: '32px', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => this.startGame(sceneKey));
        button.setOrigin(0.5);
        button.sceneKey = sceneKey;
        button.visible = false;
        return button;
    }

    showDifficultyMenu() {
        this.mainMenuButtons.forEach(button => button.setVisible(false));
        this.buttons = this.difficultyButtons;
        this.buttons.forEach(button => button.setVisible(true));
        this.selectedButtonIndex = 0;
        this.highlightButton(this.buttons[this.selectedButtonIndex]);
    }

    showInstructions() {
        this.scene.start('InstructionsScene');
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
        if (button.sceneKey) {
            this.startGame(button.sceneKey);
        } else if (button.onClick) {
            button.onClick();
        }
    }

    startGame(sceneKey) {
        this.scene.start(sceneKey);
    }
}
