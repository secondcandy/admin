// 仓库大仓库
//引入创建大仓库方法
import { createPinia } from 'pinia'
// 创建大仓库
let pinia = createPinia()
// 对外暴露，入口文件需要安装仓库
export default pinia
