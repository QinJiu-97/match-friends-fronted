import {createApp} from 'vue'
import App from './App.vue'

import * as VueRouter from "vue-router";
import routes from "./config/route";
//引入你需要的组件
import Vant from 'vant';
//引入组件样式
import 'vant/lib/index.css';
import path from "path";
import {NOTFOUND} from "dns";

const app = createApp(App);
app.use(Vant);


// 创建路由实例并传递 `routes` 配置
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    //如果是 history 模式 + nginx部署上线加一句这个
    //    location / {
    //       try_files $uri $uri/ /index.html;
    //     }
    history: VueRouter.createWebHistory(),
    routes , // `routes: routes` 的缩写
})
app.use(router)
app.mount('#app')









