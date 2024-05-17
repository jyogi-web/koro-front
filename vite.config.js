import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist'
    },
    resolve: {
        alias: {
            'phaser': 'phaser/dist/phaser.js'
        }
    }
});
