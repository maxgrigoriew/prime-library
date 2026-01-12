import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {storybookTest} from '@storybook/addon-vitest/vitest-plugin';
import {playwright} from '@vitest/browser-playwright';
import svgLoader from 'vite-svg-loader'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [
        vue(),
        svgLoader({defaultImport: 'component'}),

    ],
    resolve: {
        alias: {
            '@': path.resolve('./src'),
        },
    },
    server: {
        open: true,
        host: 'localhost',
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                proxyTimeout: 30000,
                timeout: 30000,
            },
        },
    },
    test: {
        projects: [{
            extends: true,
            plugins: [
                storybookTest({
                    configDir: path.join(dirname, '.storybook')
                })],
            test: {
                name: 'storybook',
                browser: {
                    enabled: true,
                    headless: true,
                    provider: playwright({}),
                    instances: [{
                        browser: 'chromium'
                    }]
                },
                setupFiles: ['.storybook/vitest.setup.ts']
            }
        }]
    }
});