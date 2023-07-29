import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, {VantResolve} from 'vite-plugin-style-import';
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({

    plugins: [
        vue(),
        styleImport({
            resolves: [VantResolve()],
        }),


    ],

    //本地运行配置，以及反向代理配置
    server: {
        port: 3001,

    },

    define: {
        'process.env': {
            Node_ENV: process.env.Node_ENV
        }
    },
    resolve: {
        alias: {
            //配置全局的访问路径，可通过@访问到src文件地址
            "@": resolve(__dirname, "./src"),


        }
    },

})



