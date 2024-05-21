import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        outDir: 'dist',
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                    if (id.includes('src/scenes')) {
                        return 'scenes';
                    }
                }
            }
        }
    },
    resolve: {
        alias: {
            'phaser': 'phaser/dist/phaser.js'
        }
    }
});
