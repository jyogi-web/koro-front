import Phaser from 'phaser';

let player;
let cursors;
let walls;
let goal;
let mazeWidth = 10;
let mazeHeight = 10;
let cellSize = 80;
let enemies;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('player', 'path/to/player.png');
        this.load.image('goal', 'path/to/goal.png');
        this.load.image('wall', 'path/to/wall.png');
        this.load.image('enemy', 'path/to/enemy.png');
    }

    create() {
        this.cameras.main.setBounds(0, 0, mazeWidth * cellSize, mazeHeight * cellSize);
        this.physics.world.setBounds(0, 0, mazeWidth * cellSize, mazeHeight * cellSize);

        player = this.physics.add.sprite(40, 40, 'player');
        player.setCollideWorldBounds(true);

        walls = this.physics.add.staticGroup();
        this.createMaze(mazeWidth, mazeHeight, cellSize, cellSize, 0, 0);

        goal = this.physics.add.staticGroup();
        goal.create(mazeWidth * cellSize - 40, mazeHeight * cellSize - 40, 'goal');

        enemies = this.physics.add.group();
        this.createEnemies();

        this.physics.add.collider(player, walls);
        this.physics.add.collider(player, enemies, hitEnemy, null, this);
        this.physics.add.overlap(player, goal, reachGoal, null, this);

        cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.startFollow(player);
        this.cameras.main.setZoom(0.5);
    }

    update() {
        player.setVelocity(0);

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
        const maze = [];
        for (let y = 0; y < rows; y++) {
            maze[y] = [];
            for (let x = 0; x < cols; x++) {
                maze[y][x] = { visited: false, top: true, right: true, bottom: true, left: true };
            }
        }

        const stack = [];
        const currentCell = { x: 0, y: 0 };
        maze[currentCell.y][currentCell.x].visited = true;
        stack.push(currentCell);

        const directions = [
            { x: 0, y: -1, wall: 'top', opposite: 'bottom' },
            { x: 1, y: 0, wall: 'right', opposite: 'left' },
            { x: 0, y: 1, wall: 'bottom', opposite: 'top' },
            { x: -1, y: 0, wall: 'left', opposite: 'right' },
        ];

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

        // 壁を作成
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

    createEnemies() {

        enemies.create(400, 300, 'enemy');
        enemies.create(200, 200, 'enemy');
    }
}

function hitEnemy(player, enemy) {
    this.physics.pause();
    player.setTint(0xff0000);
    const gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#ff0000' });
    gameOverText.setOrigin(0.5);
    const restartButton = this.add.text(400, 400, 'Restart', { fontSize: '32px', fill: '#ffffff' })
        .setInteractive()
        .on('pointerdown', () => this.scene.restart());
    restartButton.setOrigin(0.5);
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
