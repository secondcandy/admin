import { createApp } from 'vue'
import App from './App.vue'
// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
// 配置element-plus 国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
// 获取应用的实例对象
const app = createApp(App)
// 安装ElementPlus插件
app.use(ElementPlus,{
    locale:zhCn //element-plus国际化配置
})
// 将应用挂载到挂载点上
app.mount('#app')


