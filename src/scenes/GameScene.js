import Phaser from 'phaser';

let player;
let cursors;
let walls;
let goal;
let mazeWidth = 10;
let mazeHeight = 10;
let cellSize = 80;
let coins;
let movingObstacles;
let movingObstacles2;
let movingObstacles3;
let movingObstacles4;
let movingObstacles5;
let movingObstacles6;
let movingObstacles7;
let movingObstacles8;
let movingObstacles9;
let movingObstacles10;
let movingObstacles11;

// メインのゲームシーンを定義
export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // 必要なアセットを読み込む
        this.load.image('player', 'path/to/player.png');
        this.load.image('goal', 'path/to/goal.png');
        this.load.image('wall', 'path/to/wall.png');
        this.load.image('enemy', 'path/to/enemy.png');
        this.load.image('coin', 'path/to/coin.png');
    }

    create() {
        // カメラとワールドの境界を設定
        this.cameras.main.setBounds(0, 0, mazeWidth * cellSize, mazeHeight * cellSize);
        this.physics.world.setBounds(0, 0, mazeWidth * cellSize, mazeHeight * cellSize);

        // プレイヤーを作成し、ワールドの境界と衝突させる
        player = this.physics.add.sprite(40, 40, 'player');
        player.setCollideWorldBounds(true);

        // 静的な壁のグループを作成
        walls = this.physics.add.staticGroup();
        // 迷路を生成
        this.createMaze(mazeWidth, mazeHeight, cellSize, cellSize, 0, 0);

        // ゴールを作成
        goal = this.physics.add.staticGroup();
        goal.create(mazeWidth * cellSize - 40, mazeHeight * cellSize - 40, 'goal');

        // コインを格納するためのグループを作成
        coins = this.physics.add.group();

        for (let i = 0; i < totalCoins; i++) {
            // ランダムな位置にコインを作成
            let x = Phaser.Math.Between(0, 800);
            let y = Phaser.Math.Between(0, 600);

            // コインをグループに追加
            coin = coins.create(x, y, 'coin');

            // コインとプレイヤーが重なったときの処理を設定
            this.physics.add.overlap(player, coin, collectItem, null, this);
        }

        //動く敵を作成
        //1
        movingObstacles = this.physics.add.group();
        let movingObstacle1 = movingObstacles.create(800, 120, 'obstacle');
        movingObstacle1.setVelocityX(200);
        movingObstacle1.setCollideWorldBounds(true);
        movingObstacle1.setBounce(1);
        //2
        movingObstacles2 = this.physics.add.group();
        let movingObstacle2 = movingObstacles2.create(700, 200, 'Obstacle');
        movingObstacle2.setVelocityX(200);
        movingObstacle2.setCollideWorldBounds(true);
        movingObstacle2.setBounce(1);
        //3
        movingObstacles3 = this.physics.add.group();
        let movingObstacle3 = movingObstacles3.create(600, 280, 'Obstacle');
        movingObstacle3.setVelocityX(200);
        movingObstacle3.setCollideWorldBounds(true);
        movingObstacle3.setBounce(1);
        //4
        movingObstacles4 = this.physics.add.group();
        let movingObstacle4 = movingObstacles4.create(500, 360, 'Obstacle');
        movingObstacle4.setVelocityX(200);
        movingObstacle4.setCollideWorldBounds(true);
        movingObstacle4.setBounce(1);
        //5
        movingObstacles5 = this.physics.add.group();
        let movingObstacle5 = movingObstacles5.create(400, 440, 'Obstacle');
        movingObstacle5.setVelocityX(200);
        movingObstacle5.setCollideWorldBounds(true);
        movingObstacle5.setBounce(1);
        //6
        movingObstacles6 = this.physics.add.group();
        let movingObstacle6 = movingObstacles6.create(300, 520, 'Obstacle');
        movingObstacle6.setVelocityX(200);
        movingObstacle6.setCollideWorldBounds(true);
        movingObstacle6.setBounce(1);
        //7
        movingObstacles7 = this.physics.add.group();
        let movingObstacle7 = movingObstacles7.create(200, 600, 'Obstacle');
        movingObstacle7.setVelocityX(200);
        movingObstacle7.setCollideWorldBounds(true);
        movingObstacle7.setBounce(1);
        //8
        movingObstacles8 = this.physics.add.group();
        let movingObstacle8 = movingObstacles8.create(100, 680, 'Obstacle');
        movingObstacle8.setVelocityX(200);
        movingObstacle8.setCollideWorldBounds(true);
        movingObstacle8.setBounce(1);
        //9
        movingObstacles9 = this.physics.add.group();
        let movingObstacle9 = movingObstacles9.create(700, 120, 'Obstacle');
        movingObstacle9.setVelocityX(400);
        movingObstacle9.setVelocityY(300);
        movingObstacle9.setCollideWorldBounds(true);
        movingObstacle9.setBounce(1.05);
        //10
        movingObstacles10 = this.physics.add.group();
        let movingObstacle10 = movingObstacles10.create(670, 90, 'Obstacle');
        movingObstacle10.setVelocityX(400);
        movingObstacle10.setVelocityY(300);
        movingObstacle10.setCollideWorldBounds(true);
        movingObstacle10.setBounce(1.05);
        //11
        movingObstacles11 = this.physics.add.group();
        let movingObstacle11 = movingObstacles11.create(640, 60, 'Obstacle');
        movingObstacle11.setVelocityX(400);
        movingObstacle11.setVelocityY(300);
        movingObstacle11.setCollideWorldBounds(true);
        movingObstacle11.setBounce(1.05);

        // 衝突と重なりを設定
        this.physics.add.collider(player, walls);
        this.physics.add.overlap(player, coins, collectItem, null, this);
        this.physics.add.overlap(player, goal, reachGoal, null, this);
        this.physics.add.collider(player, movingObstacle1, hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacle2, hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacle3, hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacle4, hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacle5, hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacle6, hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacle7, hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacle8, hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacle9, hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacle10, hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacle11, hitEnemy, null, this);
        

        // プレイヤーの移動用のカーソルキーを設定
        cursors = this.input.keyboard.createCursorKeys();

        // カメラをプレイヤーに追従させ、ズームレベルを調整
        this.cameras.main.startFollow(player);
        this.cameras.main.setZoom(0.5);
    }

    update() {
        // プレイヤーの速度をリセット
        player.setVelocity(0);

        // プレイヤーの移動を処理
        if (cursors.left.isDown) {
            player.setVelocityX(-200);
        } else if (cursors.right.isDown) {
            player.setVelocityX(200);
        }

        if (cursors.up.isDown) {
            player.setVelocityY(-200);
        } else if (cursors.down.isDown) {
            player.setVelocityY(200);
        }
    }

    createMaze(rows, cols, cellWidth, cellHeight, offsetX, offsetY) {
        // 迷路のグリッドを初期化
        const maze = [];
        for (let y = 0; y < rows; y++) {
            maze[y] = [];
            for (let x = 0; x < cols; x++) {
                maze[y][x] = { visited: false, top: true, right: true, bottom: true, left: true };
            }
        }

        // スタックと開始位置を初期化
        const stack = [];
        const currentCell = { x: 0, y: 0 };
        maze[currentCell.y][currentCell.x].visited = true;
        stack.push(currentCell);

        // 迷路生成のための方向を定義
        const directions = [
            { x: 0, y: -1, wall: 'top', opposite: 'bottom' },
            { x: 1, y: 0, wall: 'right', opposite: 'left' },
            { x: 0, y: 1, wall: 'bottom', opposite: 'top' },
            { x: -1, y: 0, wall: 'left', opposite: 'right' },
        ];

        // 深さ優先探索を使って迷路を生成
        while (stack.length > 0) {
            const current = stack[stack.length - 1];
            const neighbors = directions
                .map(direction => ({
                    x: current.x + direction.x,
                    y: current.y + direction.y,
                    direction
                }))
                .filter(neighbor =>
                    neighbor.x >= 0 &&
                    neighbor.y >= 0 &&
                    neighbor.x < cols &&
                    neighbor.y < rows &&
                    !maze[neighbor.y][neighbor.x].visited
                );

            if (neighbors.length > 0) {
                const next = neighbors[Math.floor(Math.random() * neighbors.length)];
                maze[current.y][current.x][next.direction.wall] = false;
                maze[next.y][next.x][next.direction.opposite] = false;
                maze[next.y][next.x].visited = true;
                stack.push({ x: next.x, y: next.y });
            } else {
                stack.pop();
            }
        }

        // 迷路構造に基づいて壁を作成
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cell = maze[y][x];
                const cellX = x * cellWidth + offsetX;
                const cellY = y * cellHeight + offsetY;
                if (cell.top) {
                    const wallSprite = this.add.rectangle(cellX + cellWidth / 2, cellY, cellWidth, 10, 0xffffff);
                    this.physics.add.existing(wallSprite, true);
                    walls.add(wallSprite);
                }
                if (cell.right) {
                    const wallSprite = this.add.rectangle(cellX + cellWidth, cellY + cellHeight / 2, 10, cellHeight, 0xffffff);
                    this.physics.add.existing(wallSprite, true);
                    walls.add(wallSprite);
                }
                if (cell.bottom) {
                    const wallSprite = this.add.rectangle(cellX + cellWidth / 2, cellY + cellHeight, cellWidth, 10, 0xffffff);
                    this.physics.add.existing(wallSprite, true);
                    walls.add(wallSprite);
                }
                if (cell.left) {
                    const wallSprite = this.add.rectangle(cellX, cellY + cellHeight / 2, 10, cellHeight, 0xffffff);
                    this.physics.add.existing(wallSprite, true);
                    walls.add(wallSprite);
                }
            }
        }
    }
}

// 敵との衝突を処理する関数
function hitEnemy(player, enemy) {
    this.physics.pause(); // 物理システムを一時停止
    player.setTint(0xff0000); // プレイヤーを赤色に変更
    const gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#ff0000' });
    gameOverText.setOrigin(0.5);
    const restartButton = this.add.text(400, 400, 'Restart', { fontSize: '32px', fill: '#ffffff' })
        .setInteractive()
        // クリックでシーンを再起動
        .on('pointerdown', () => this.scene.restart());
    restartButton.setOrigin(0.5);
}

// コインを収集する関数
function collectItem(player, collectible) {
    // コインを無効化して非表示にする
    collectible.disableBody(true, true);
}

// ゴールに到達したときの処理を行う関数
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
