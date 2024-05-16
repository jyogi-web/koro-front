import Phaser from "phaser";
import MyScene from "@/scenes/MyScene";

const config = {
    parent: "app",
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 200 }
        }
    },
    scene: [
        MyScene,
    ]
};

export default new Phaser.Game(config);
