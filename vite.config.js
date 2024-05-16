import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        alias: {
            '@': `${__dirname}/src`,
            '~': `${__dirname}/src/static`,
        },
    },
    build: {
        assetsInlineLimit: 0,
        chunkSizeWarningLimit: 1024 * 1024,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                },
            },
        },
    },
});
