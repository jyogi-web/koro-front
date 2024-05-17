import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        alias: {
            'phaser': 'phaser/dist/phaser.js'
        }
    }
});
