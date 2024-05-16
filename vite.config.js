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
    },
});
