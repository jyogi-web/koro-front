import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
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
