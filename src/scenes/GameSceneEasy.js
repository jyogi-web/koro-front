import Phaser from 'phaser';

let player;
let cursors;
let walls;
let goal;
let mazeWidth = 10;
let mazeHeight = 10;
let cellSize = 80;
let coins;
let coin;
let collectedCoins = 0;
let totalCoins = 10;
let movingObstacles1;
let movingObstacles2;
let movingObstacles3;
let movingObstacles4;
let gameOver = false;

export default class GameSceneEasy extends Phaser.Scene {
    constructor() {
        super({ key: 'GameSceneEasy' });
    }

    preload() {
        this.load.image('player', 'assets/Play.png');
        this.load.image('goal', 'assets/goal.png');
        this.load.image('coin', 'assets/R (4).png');
        this.load.image('Obstacle', 'assets/enemy.png');
    }

    create() {
        // カメラとワールドの境界を設定
        this.cameras.main.setBounds(0, 0, mazeWidth * cellSize, mazeHeight * cellSize);
        this.physics.world.setBounds(0, 0, mazeWidth * cellSize, mazeHeight * cellSize);

        // プレイヤーを作成し、ワールドの境界と衝突させる
        player = this.physics.add.sprite(40, 40, 'player');
        player.setScale(0.1);
        player.setCollideWorldBounds(true);

        // カメラがプレイヤーを追従するように設定
        this.cameras.main.startFollow(player);

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
            let x = Phaser.Math.Between(0, mazeWidth * cellSize);
            let y = Phaser.Math.Between(0, mazeHeight * cellSize);

            // コインをグループに追加
            coin = coins.create(x, y, 'coin');

            // コインとプレイヤーが重なったときの処理を設定
            this.physics.add.overlap(player, coin, collectItem, null, this);
        }

        // 動く敵を作成
        movingObstacles1 = this.physics.add.group();
        let movingObstacle1 = movingObstacles1.create(700, 200, 'Obstacle');
        movingObstacle1.setVelocityX(200);
        movingObstacle1.setCollideWorldBounds(true);
        movingObstacle1.setBounce(1);
        movingObstacle1.setScale(0.05);
        movingObstacle1.setOrigin(0.5, 0.5);
        movingObstacle1.body.setCircle(movingObstacle1.width / 2.5);

        movingObstacles2 = this.physics.add.group();
        let movingObstacle2 = movingObstacles2.create(500, 360, 'Obstacle');
        movingObstacle2.setVelocityX(200);
        movingObstacle2.setCollideWorldBounds(true);
        movingObstacle2.setBounce(1);
        movingObstacle2.setScale(0.05);
        movingObstacle2.setOrigin(0.5, 0.5);
        movingObstacle2.body.setCircle(movingObstacle2.width / 2);

        movingObstacles3 = this.physics.add.group();
        let movingObstacle3 = movingObstacles3.create(300, 520, 'Obstacle');
        movingObstacle3.setVelocityX(200);
        movingObstacle3.setCollideWorldBounds(true);
        movingObstacle3.setBounce(1);
        movingObstacle3.setScale(0.05);
        movingObstacle3.setOrigin(0.5, 0.5);
        movingObstacle3.body.setCircle(movingObstacle3.width / 2);

        movingObstacles4 = this.physics.add.group();
        let movingObstacle4 = movingObstacles4.create(100, 650, 'Obstacle');
        movingObstacle4.setVelocityX(200);
        movingObstacle4.setCollideWorldBounds(true);
        movingObstacle4.setBounce(1);
        movingObstacle4.setScale(0.05);
        movingObstacle4.setOrigin(0.5, 0.5);
        movingObstacle4.body.setCircle(movingObstacle4.width / 2);

        // 衝突と重なりを設定
        this.physics.add.collider(player, walls);
        this.physics.add.overlap(player, coins, collectItem, null, this);
        this.physics.add.overlap(player, goal, reachGoal, null, this);
        this.physics.add.collider(player, movingObstacle1, hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacle2, hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacle3, hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacle4, hitEnemy, null, this);

        // プレイヤーの移動用のカーソルキーを設定
        cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-ENTER', this.handleRestart, this);
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        // ゲームパッド接続のリスナー
        this.input.gamepad.on('connected', (pad) => {
            if (!this.pad) {
                console.log('Gamepad connected:', pad.id);
                this.pad = pad;
            }
        });

        this.input.gamepad.on('disconnected', (pad) => {
            if (this.pad && this.pad.id === pad.id) {
                console.log('Gamepad disconnected:', pad.id);
                this.pad = null;
            }
        });

    }

    update() {
        if (gameOver) {
            return;
        }
        // プレイヤーの速度をリセット
        player.setVelocity(0);

        // コントローラーが接続されている場合はコントローラー入力を優先
        if (this.pad) {
            const xAxis = this.pad.axes[0].getValue();
            const yAxis = this.pad.axes[1].getValue();

            if (xAxis < -0.5) {
                player.setVelocityX(-200);
            } else if (xAxis > 0.5) {
                player.setVelocityX(200);
            }
            if (yAxis < -0.5) {
                player.setVelocityY(-200);
            } else if (yAxis > 0.5) {
                player.setVelocityY(200);
            }
        } else {
            // コントローラーが接続されていない場合はキーボード入力
            if (cursors.left.isDown || this.wasd.left.isDown) {
                player.setVelocityX(-200);
            } else if (cursors.right.isDown || this.wasd.right.isDown) {
                player.setVelocityX(200);
            }
            if (cursors.up.isDown || this.wasd.up.isDown) {
                player.setVelocityY(-200);
            } else if (cursors.down.isDown || this.wasd.down.isDown) {
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

        // 迷路生成のためのスタックと初期セルを設定
        const stack = [];
        let currentCell = { x: 0, y: 0 };
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

    handleRestart() {
        if (gameOver) {
            collectedCoins = 0;
            player.clearTint();
            gameOver = false;
            this.scene.restart();
        }
    }
}

// 敵との衝突を処理する関数
function hitEnemy(player, enemy) {
    this.physics.pause(); // 物理システムを一時停止
    gameOver = true;
    player.setTint(0xff0000); // プレイヤーを赤色に変更
    const gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#ff0000' });
    gameOverText.setOrigin(0.5);
    const restartButton = this.add.text(400, 400, 'Restart', { fontSize: '32px', fill: '#ffffff' })
        .setInteractive()
        // クリックでシーンを再起動
        .on('pointerdown', () => {
            gameOver = false;
            this.scene.restart();
        });
    restartButton.setOrigin(0.5);
}
// コインを収集する関数
function collectItem(player, collectible) {
    // コインを無効化して非表示にする
    collectible.disableBody(true, true);
    // 収集したコインの数を増やす
    collectedCoins++;
    // 全てのコインを収集した場合
    if (collectedCoins === totalCoins) {
        goal.children.iterate(child => {
            child.setTint(0x00ff00);
        });
    }
}
// ゴールに到達したときの処理を行う関数
function reachGoal(player, goal) {
    if (collectedCoins === totalCoins) {
        this.physics.pause();
        gameOver = true;
        player.setTint(0x00ff00);
        const goalText = this.add.text(400, 300, 'You Win!', { fontSize: '64px', fill: '#00ff00' });
        goalText.setOrigin(0.5);
        const restartButton = this.add.text(400, 400, 'Menu', { fontSize: '32px', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => {
                gameOver = false;
                this.scene.start('StartScene');
            });
        restartButton.setOrigin(0.5);
    }
}
