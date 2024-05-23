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
let scoreText
let gameOver = false;
let cameraTimer;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // 必要なアセットを読み込む
        this.load.image('player', 'assets/Play.png');
        this.load.image('goal', 'assets/goal.png');
        this.load.image('coin', 'assets/R (4).png');
        this.load.image('Obstacle', 'assets/enemy.png');
    }

    create() {
        const worldWidth = mazeWidth * cellSize;
        const worldHeight = mazeHeight * cellSize;
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // カメラとワールドの境界を設定
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

        // プレイヤーを作成し、ワールドの境界と衝突させる
        player = this.physics.add.sprite(centerX - worldWidth / 2 + 40, centerY - worldHeight / 2 + 40, 'player');
        player.setCollideWorldBounds(true);
        player.setScale(0.035);

        // 静的な壁のグループを作成
        walls = this.physics.add.staticGroup();
        // 迷路を生成
        this.createMaze(mazeWidth, mazeHeight, cellSize, cellSize, centerX - worldWidth / 2, centerY - worldHeight / 2);

        // ゴールを作成して非表示にする
        goal = this.physics.add.staticGroup();
        let goalSprite = goal.create(centerX + worldWidth / 2 - 40, centerY + worldHeight / 2 - 40, 'goal');
        goalSprite.setVisible(false);
        goalSprite.setScale(0.5);

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
        movingObstacle1.setScale(0.025);
        movingObstacle1.setOrigin(0.25, 0.25);
        movingObstacle1.body.setCircle(movingObstacle1.width / 2.5);

        // 2
        movingObstacles2 = this.physics.add.group();
        let movingObstacle2 = movingObstacles2.create(700, 220, 'Obstacle');
        movingObstacle2.setVelocityX(200);
        movingObstacle2.setCollideWorldBounds(true);
        movingObstacle2.setBounce(1);
        movingObstacle2.setScale(0.025);
        movingObstacle2.setOrigin(0.5, 0.5);
        movingObstacle2.body.setCircle(movingObstacle2.width / 2.5);
        // 3
        movingObstacles3 = this.physics.add.group();
        let movingObstacle3 = movingObstacles3.create(600, 330, 'Obstacle');
        movingObstacle3.setVelocityX(200);
        movingObstacle3.setCollideWorldBounds(true);
        movingObstacle3.setBounce(1);
        movingObstacle3.setScale(0.025);
        movingObstacle3.setOrigin(0.5, 0.5);
        movingObstacle3.body.setCircle(movingObstacle3.width / 2.5);
        // 4
        movingObstacles4 = this.physics.add.group();
        let movingObstacle4 = movingObstacles4.create(500, 440, 'Obstacle');
        movingObstacle4.setVelocityX(200);
        movingObstacle4.setCollideWorldBounds(true);
        movingObstacle4.setBounce(1);
        movingObstacle4.setScale(0.025);
        movingObstacle4.setOrigin(0.5, 0.5);
        movingObstacle4.body.setCircle(movingObstacle4.width / 2.5);
        // 5
        movingObstacles5 = this.physics.add.group();
        let movingObstacle5 = movingObstacles5.create(400, 550, 'Obstacle');
        movingObstacle5.setVelocityX(200);
        movingObstacle5.setCollideWorldBounds(true);
        movingObstacle5.setBounce(1);
        movingObstacle5.setScale(0.025);
        movingObstacle5.setOrigin(0.5, 0.5);
        movingObstacle5.body.setCircle(movingObstacle5.width / 2.5);
        // 6
        movingObstacles6 = this.physics.add.group();
        let movingObstacle6 = movingObstacles6.create(300, 660, 'Obstacle');
        movingObstacle6.setVelocityX(200);
        movingObstacle6.setCollideWorldBounds(true);
        movingObstacle6.setBounce(1);
        movingObstacle6.setScale(0.025);
        movingObstacle6.setOrigin(0.5, 0.5);
        movingObstacle6.body.setCircle(movingObstacle6.width / 2.5);

        // 衝突と重なりを設定
        this.physics.add.collider(player, walls);
        this.physics.add.overlap(player, coins, this.collectItem, null, this);
        this.physics.add.overlap(player, goal, this.reachGoal, null, this);
        this.physics.add.collider(player, movingObstacles, this.hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacles2, this.hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacles3, this.hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacles4, this.hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacles5, this.hitEnemy, null, this);
        this.physics.add.collider(player, movingObstacles6, this.hitEnemy, null, this);

        // プレイヤーの移動用のカーソルキーを設定
        cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-ENTER', this.handleRestart, this);
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };

        // カメラをプレイヤーに追従させ、ズームレベルを調整
        this.cameras.main.startFollow(player);
        this.cameras.main.setZoom(1);

        // 一定時間後にプレイヤー視点に切り替える
        cameraTimer = this.time.addEvent({
            delay: 10000, // 10秒後に実行
            callback: this.switchToPlayerView,
            callbackScope: this
        });
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
        // スコアテキストの生成
        scoreText = this.add.text(15, 30, 'score: 0', { fontSize: '15px', fill: '#FFF' }).setScrollFactor(0);
    }
    update() {
        if (gameOver) {
            return;
        }

        // プレイヤーの速度をリセット
        player.setVelocity(0);

        if (this.pad) {
            const xAxis = this.pad.axes[0].getValue();
            const yAxis = this.pad.axes[1].getValue();

            if (controlsInverted) {
                if (xAxis < -0.5) {
                    player.setVelocityX(200); // 反転
                } else if (xAxis > 0.5) {
                    player.setVelocityX(-200); // 反転
                }
                if (yAxis < -0.5) {
                    player.setVelocityY(200); // 反転
                } else if (yAxis > 0.5) {
                    player.setVelocityY(-200); // 反転
                }
            } else {
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
            }
        } else {
            if (controlsInverted) {
                if (cursors.left.isDown || this.wasd.left.isDown) {
                    player.setVelocityX(200); // 反転
                } else if (cursors.right.isDown || this.wasd.right.isDown) {
                    player.setVelocityX(-200); // 反転
                }
                if (cursors.up.isDown || this.wasd.up.isDown) {
                    player.setVelocityY(200); // 反転
                } else if (cursors.down.isDown || this.wasd.down.isDown) {
                    player.setVelocityY(-200); // 反転
                }
            } else {
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

    collectItem(player, collectible) {
        // コインを無効化して非表示にする
        collectible.disableBody(true, true);
        // 収集したコインの数を増やす
        collectedCoins++;
        scoreText.setText(`score: ${collectedCoins * 10}`);
        // コインを5個以上集めたら操作を反転させる
        if (collectedCoins >= 5) {
            controlsInverted = true;
            player.setTint(0x00ff00);
        }
        // 全てのコインを収集した場合
        if (collectedCoins === totalCoins) {
            // ゴールを表示
            goal.children.iterate(child => {
                child.setVisible(true);
                child.setTint(0x00ff00);
            });
        }
    }


    reachGoal(player, goal) {
        // 全てのコインを収集しているか確認
        if (collectedCoins === totalCoins) {
            this.physics.pause();
            gameOver = true;
            player.setTint(0x00ff00);

            // カメラのズームをリセット
            this.cameras.main.setZoom(1);
            this.cameras.main.centerOn(this.cameras.main.worldView.x + this.cameras.main.worldView.width / 2,
                this.cameras.main.worldView.y + this.cameras.main.worldView.height / 2);

            const goalText = this.add.text(this.cameras.main.worldView.centerX, this.cameras.main.worldView.centerY - 50, 'You Win!', { fontSize: '64px', fill: '#00ff00' });
            goalText.setOrigin(0.5);

            const nextLevelButton = this.add.text(this.cameras.main.worldView.centerX, this.cameras.main.worldView.centerY + 50, 'Next Level', { fontSize: '32px', fill: '#ffffff' })
                .setInteractive()
                .on('pointerdown', () => {
                    collectedCoins = 0;
                    controlsInverted = false;
                    player.clearTint();
                    currentLevel++;
                    gameOver = false;
                    this.scene.restart();
                });
            nextLevelButton.setOrigin(0.5);
        }
    }


    hitEnemy(player, enemy) {
        this.physics.pause(); // 物理システムを一時停止
        gameOver = true;
        player.setTint(0xff0000); // プレイヤーを赤色に変更
        const gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#ff0000' });
        gameOverText.setOrigin(0.5);
        const restartButton = this.add.text(400, 400, 'Restart', { fontSize: '32px', fill: '#ffffff' })
            .setInteractive()
            .on('pointerdown', () => {
                collectedCoins = 0;
                controlsInverted = false;
                player.clearTint();
                gameOver = false;
                this.scene.restart();
            });
        restartButton.setOrigin(0.5);
    }

    handleRestart() {
        if (gameOver) {
            collectedCoins = 0;
            controlsInverted = false;
            player.clearTint();
            gameOver = false;
            this.scene.restart();
        }
    }
    switchToPlayerView() {
        // プレイヤー視点にカメラを切り替える処理
        this.cameras.main.setZoom(2);
        this.cameras.main.startFollow(player, true, 0.08, 0.08);

        // 新しいズームレベルに基づいてカメラの境界を更新
        const worldWidth = mazeWidth * cellSize;
        const worldHeight = mazeHeight * cellSize;
        const zoomLevel = this.cameras.main.zoom;
        this.cameras.main.setBounds(0, 0, worldWidth * zoomLevel, worldHeight * zoomLevel);
    }
}
