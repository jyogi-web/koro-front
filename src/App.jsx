import React, { useRef, useState, useEffect } from 'react';
import Phaser from 'phaser';
import StartScene from './scenes/StartScene';
import GameScene from './scenes/GameScene';
import GameSceneEasy from './scenes/GameSceneEasy';
import InstructionsScene from './scenes/InstructionsScene';

function App() {
    // The sprite can only be moved in the MainMenu Scene
    const [canMoveSprite, setCanMoveSprite] = useState(true);

    // References to the Phaser game instance
    const gameRef = useRef(null);
    const gameContainerRef = useRef(null);
    const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            scene: [StartScene, GameScene, GameSceneEasy, InstructionsScene],
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false,
                },
            },
            input: {
                gamepad: true,
            },
            parent: gameContainerRef.current, // Attach Phaser to this div
        };

        // Create Phaser game instance
        gameRef.current = new Phaser.Game(config);

        // Cleanup on unmount
        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
            }
        };
    }, []);

    return (
        <div id="app">
            <div ref={gameContainerRef} style={{ width: '800px', height: '600px' }} />
        </div>
    );
}

export default App;
