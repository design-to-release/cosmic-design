import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
// import { cStyle } from './plugin/rollup-plugin-vue-cosmic';
import { resolve } from 'path';
import dts from 'vite-dts';
import { cosmicCollectionFactory } from 'cosmic-icon';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';


export default defineConfig({
    root: './',
    resolve: {
        preserveSymlinks: false,
        alias: {
            'cosmic-vue': resolve('./'),
            'cosmic-ui': resolve('../ui'),
            'cosmic-common': resolve('../common'),
        },
    },
    plugins: [
        dts(),
        vue(),
        Icons({
            compiler: 'vue3',
            scale: 1,
            defaultClass: 'cos-icon',
            customCollections: {
                ...cosmicCollectionFactory(),
            },
        }),
        Components({
            dts: true,
            resolvers: [
                IconsResolver({
                    customCollections: ['cosmic'],
                }),
            ],
        }),
    ],
    build: {
        outDir: './dist',
        lib: {
            entry: resolve(__dirname, 'components/index.ts'),
            name: 'cosmic-vue',
            fileName: 'index',
        },
        rollupOptions: {
            external: ['vue', 'cosmic-ui'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
});
