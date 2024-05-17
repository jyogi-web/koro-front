import Phaser from 'phaser';

let player;
let cursors;
let obstacles;
let collectibles;
let goal;
let walls;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('player', 'path/to/player.png');
        this.load.image('obstacle', 'path/to/obstacle.png');
        this.load.image('collectible', 'path/to/collectible.png');
        this.load.image('goal', 'path/to/goal.png');
        this.load.image('wall', 'path/to/wall.png'); // 壁の画像を読み込む
    }

    create() {
        player = this.physics.add.sprite(100, 100, 'player');
        player.setCollideWorldBounds(true);

        obstacles = this.physics.add.staticGroup();
        obstacles.create(400, 300, 'obstacle');

        collectibles = this.physics.add.group();
        collectibles.create(200, 200, 'collectible');

        goal = this.physics.add.staticGroup();
        goal.create(700, 500, 'goal');

        // 壁の追加
        walls = this.physics.add.staticGroup();
        walls.create(400, 100, 'wall'); // 壁を適当な位置に配置
        walls.create(400, 200, 'wall');
        walls.create(400, 400, 'wall');

        this.physics.add.collider(player, walls); // プレイヤーと壁の衝突判定
        this.physics.add.collider(player, obstacles, hitObstacle, null, this);
        this.physics.add.overlap(player, collectibles, collectItem, null, this);
        this.physics.add.overlap(player, goal, reachGoal, null, this);

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        player.setVelocity(0);

        if (cursors.left.isDown) {
            player.setVelocityX(-160);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
        }

        if (cursors.up.isDown) {
            player.setVelocityY(-160);
        } else if (cursors.down.isDown) {
            player.setVelocityY(160);
        }
    }
}

function hitObstacle(player, obstacle) {
    this.physics.pause();
    player.setTint(0xff0000);

    const gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#ff0000' });
    gameOverText.setOrigin(0.5);

    const restartButton = this.add.text(400, 400, 'Restart', { fontSize: '32px', fill: '#ffffff' })
        .setInteractive()
        .on('pointerdown', () => this.scene.restart());
    restartButton.setOrigin(0.5);
}

function collectItem(player, collectible) {
    collectible.disableBody(true, true);
}

function reachGoal(player, goal) {
    this.physics.pause();
    player.setTint(0x00ff00);

    const goalText = this.add.text(400, 300, 'You Win!', { fontSize: '64px', fill: '#00ff00' });
    goalText.setOrigin(0.5);

    const restartButton = this.add.text(400, 400, 'Menu', { fontSize: '32px', fill: '#ffffff' })
        .setInteractive()
        .on('pointerdown', () => this.scene.start('StartScene'));
    restartButton.setOrigin(0.5);
}
