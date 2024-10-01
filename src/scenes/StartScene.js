import Phaser from 'phaser';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });

    // メインメニューと難易度ボタンの定義
    this.mainMenuButtons = [
      { x: 400, y: 300, text: 'プレイ', action: 'showDifficultyMenu' },
      { x: 400, y: 400, text: '遊び方', action: 'showInstructions' },
    ];
    this.difficultyButtons = [
      { x: 400, y: 300, text: 'Easy', action: 'startGameEasy' },
      { x: 400, y: 500, text: 'Hard', action: 'startGameHard' },
    ];

    this.currentButtons = this.mainMenuButtons;
    this.selectedIndex = 0;
  }

  preload() {
    // 必要なアセットをここで読み込む
  }

  create() {
    // タイトルテキストの追加
    this.add.text(400, 100, '意地の悪いゲーム', { fontSize: '64px', fill: '#ffffff' }).setOrigin(0.5);

    // ボタンの生成
    this.buttons = this.currentButtons.map((button, index) =>
      this.createButton(button.x, button.y, button.text, index === this.selectedIndex)
    );

    // キーボード入力の設定
    this.input.keyboard.on('keydown-UP', this.moveSelectionUp, this);
    this.input.keyboard.on('keydown-DOWN', this.moveSelectionDown, this);
    this.input.keyboard.on('keydown-W', this.moveSelectionUp, this);
    this.input.keyboard.on('keydown-S', this.moveSelectionDown, this);
    this.input.keyboard.on('keydown-ENTER', this.selectButton, this);
    this.input.keyboard.on('keydown-SPACE', this.selectButton, this);
  }

  createButton(x, y, text, isSelected) {
    const button = this.add.text(x, y, text, {
      fontSize: '32px',
      fill: isSelected ? '#ff0' : '#ffffff',
    })
      .setInteractive()
      .on('pointerdown', () => this.handleButtonClick(text));
    button.setOrigin(0.5);
    return button;
  }

  moveSelectionUp() {
    this.changeButtonSelection(-1);
  }

  moveSelectionDown() {
    this.changeButtonSelection(1);
  }

  changeButtonSelection(change) {
    // 現在のボタンのハイライトを解除
    this.buttons[this.selectedIndex].setStyle({ fill: '#ffffff' });

    // 選択インデックスを更新
    this.selectedIndex = (this.selectedIndex + change + this.currentButtons.length) % this.currentButtons.length;

    // 新しい選択ボタンをハイライト
    this.buttons[this.selectedIndex].setStyle({ fill: '#ff0' });
  }

  selectButton() {
    const selectedButton = this.currentButtons[this.selectedIndex];
    this.handleButtonClick(selectedButton.action);
  }

  handleButtonClick(action) {
    if (action === 'showDifficultyMenu') {
      this.showDifficultyMenu();
    } else if (action === 'showInstructions') {
      this.scene.start('InstructionsScene');
    } else if (action === 'startGameEasy') {
      this.startGame('GameSceneEasy');
    } else if (action === 'startGameHard') {
      this.startGame('GameScene');
    }
  }

  showDifficultyMenu() {
    this.clearButtons();
    this.currentButtons = this.difficultyButtons;
    this.selectedIndex = 0;
    this.buttons = this.currentButtons.map((button, index) =>
      this.createButton(button.x, button.y, button.text, index === this.selectedIndex)
    );
  }

  clearButtons() {
    this.buttons.forEach(button => button.destroy());
  }

  startGame(sceneKey) {
    this.scene.start(sceneKey);
  }
}
