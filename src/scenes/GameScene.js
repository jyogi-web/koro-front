import Phaser from 'phaser';

let player;
let cursors;
let walls;
let goal;
let mazeWidth = 20;
let mazeHeight = 20;
let cellSize = 30;
let coins;
let coin;
let collectedCoins = 0;
let totalCoins = 10;
let currentLevel = 1;
let movingObstacles;
let movingObstacles2;
let movingObstacles3;
let movingObstacles4;
let movingObstacles5;
let movingObstacles6;
let controlsInverted = false;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // 必要なアセットを読み込む
        this.load.image('player', 'assets/R (4).png');
        this.load.image('goal', 'goal.png');
        this.load.image('coin', 'assets/R (4).png');
        this.load.image('Obstacle', 'assets/download_image_1716035805113.png');
    }

    create() {
        const worldWidth = mazeWidth * cellSize;
        const worldHeight = mazeHeight * cellSize;
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // カメラとワールドの境界を設定
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
        this.physics.world.setBounds(0, 0, worldWidth + 200, worldHeight);

        // プレイヤーを作成し、ワールドの境界と衝突させる
        player = this.physics.add.sprite(centerX - worldWidth / 2 + 40, centerY - worldHeight / 2 + 40, 'player');
        player.setCollideWorldBounds(true);
        player.setScale(0.5);

        // 静的な壁のグループを作成
        walls = this.physics.add.staticGroup();
        // 迷路を生成
        this.createMaze(mazeWidth, mazeHeight, cellSize, cellSize, centerX - worldWidth / 2, centerY - worldHeight / 2);

        // ゴールを作成
        goal = this.physics.add.staticGroup();
        goal.create(centerX + worldWidth / 2 - 40, centerY + worldHeight / 2 - 40, 'goal');

        // コインを格納するためのグループを作成
        coins = this.physics.add.group();
        for (let i = 0; i < totalCoins; i++) {
            // ランダムな位置にコインを作成
            let x = Phaser.Math.Between(centerX - worldWidth / 2, centerX + worldWidth / 2);
            let y = Phaser.Math.Between(centerY - worldHeight / 2, centerY + worldHeight / 2);

            // コインをグループに追加
            coin = coins.create(x, y, 'coin');

            // コインとプレイヤーが重なったときの処理を設定
            this.physics.add.overlap(player, coin, this.collectItem, null, this);
        }

        // 動く敵を作成
        // 1
        movingObstacles = this.physics.add.group();
        let movingObstacle1 = movingObstacles.create(800, 110, 'Obstacle');
        movingObstacle1.setVelocityX(200);
        movingObstacle1.setCollideWorldBounds(true);
        movingObstacle1.setBounce(1);
        movingObstacle1.setScale(0.125);

        // 2
        movingObstacles2 = this.physics.add.group();
        let movingObstacle2 = movingObstacles2.create(700, 220, 'Obstacle');
        movingObstacle2.setVelocityX(200);
        movingObstacle2.setCollideWorldBounds(true);
        movingObstacle2.setBounce(1);
        movingObstacle2.setScale(0.125);
        // 3
        movingObstacles3 = this.physics.add.group();
        let movingObstacle3 = movingObstacles3.create(600, 330, 'Obstacle');
        movingObstacle3.setVelocityX(200);
        movingObstacle3.setCollideWorldBounds(true);
        movingObstacle3.setBounce(1);
        movingObstacle3.setScale(0.125);
        // 4
        movingObstacles4 = this.physics.add.group();
        let movingObstacle4 = movingObstacles4.create(500, 440, 'Obstacle');
        movingObstacle4.setVelocityX(200);
        movingObstacle4.setCollideWorldBounds(true);
        movingObstacle4.setBounce(1);
        movingObstacle4.setScale(0.125);
        // 5
        movingObstacles5 = this.physics.add.group();
        let movingObstacle5 = movingObstacles5.create(400, 550, 'Obstacle');
        movingObstacle5.setVelocityX(200);
        movingObstacle5.setCollideWorldBounds(true);
        movingObstacle5.setBounce(1);
        movingObstacle5.setScale(0.125);
        // 6
        movingObstacles6 = this.physics.add.group();
        let movingObstacle6 = movingObstacles6.create(300, 660, 'Obstacle');
        movingObstacle6.setVelocityX(200);
        movingObstacle6.setCollideWorldBounds(true);
        movingObstacle6.setBounce(1);
        movingObstacle6.setScale(0.125);

        // 衝突と重なりを設定
        this.physics.add.collider(player, walls);
        this.physics.add.overlap(player, coins, this.collectItem, null, this);
        this.physics.add.overlap(player, goal, this.reachGoal, null, this);
        this.physics.add.collider(player, movingObstacle1, this.hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacle2, this.hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacle3, this.hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacle4, this.hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacle5, this.hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacle6, this.hitEnemy, null, this);

        // プレイヤーの移動用のカーソルキーを設定
        cursors = this.input.keyboard.createCursorKeys();


        // カメラをプレイヤーに追従させ、ズームレベルを調整
        this.cameras.main.startFollow(player);
        this.cameras.main.setZoom(1);
    }

    update() {
        // プレイヤーの速度をリセット
        player.setVelocity(0);

        // プレイヤーの移動を処理
        if (controlsInverted) {
            if (cursors.left.isDown) {
                player.setVelocityX(200);
            } else if (cursors.right.isDown) {
                player.setVelocityX(-200);
            }

            if (cursors.up.isDown) {
                player.setVelocityY(200);
            } else if (cursors.down.isDown) {
                player.setVelocityY(-200);
            }
        } else {
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

    // コインを収集する関数
    collectItem(player, collectible) {
        // コインを無効化して非表示にする
        collectible.disableBody(true, true);
        // 収集したコインの数を増やす
        collectedCoins++;
        // コインを5個以上集めたら操作を反転させる
        if (collectedCoins >= 5) {
            controlsInverted = true;
        }
        // 全てのコインを収集した場合
        if (collectedCoins === totalCoins) {
            goal.children.iterate(child => {
                child.setTint(0x00ff00);
            });
        }
    }

    // ゴールに到達したときの処理を行う関数
    reachGoal(player, goal) {
        // 全てのコインを収集しているか確認
        if (collectedCoins === totalCoins) {
            this.physics.pause();
            player.setTint(0x00ff00);
            const goalText = this.add.text(400, 300, 'You Win!', { fontSize: '64px', fill: '#00ff00' });
            goalText.setOrigin(0.5);
            const nextLevelButton = this.add.text(400, 400, 'Next Level', { fontSize: '32px', fill: '#ffffff' })
                .setInteractive()
                .on('pointerdown', () => {
                    collectedCoins = 0;
                    controlsInverted = false;
                    currentLevel++;
                    this.scene.restart();
                });
            nextLevelButton.setOrigin(0.5);
        }
    }

    // 敵との衝突を処理する関数
    hitEnemy(player, enemy) {
        this.physics.pause(); // 物理システムを一時停止
        player.setTint(0xff0000); // プレイヤーを赤色に変更
        const gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#ff0000' });
        gameOverText.setOrigin(0.5);
        const restartButton = this.add.text(400, 400, 'Restart', { fontSize: '32px', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => {
                collectedCoins = 0;
                controlsInverted = false;
                score = 0;
                this.scene.restart();
            });
        restartButton.setOrigin(0.5);
    }
}
