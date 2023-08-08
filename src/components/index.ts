// 引入项目中全部的全局组件
import SvgIcon from '@/components/SvgIcon/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { App } from 'vue'

const allGlobalComponent: any = { SvgIcon, Pagination }
// 对外暴露一个插件对象
export default {
  // 务必叫install方法
  install(app: App) {
    // 注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      // 注册为全局组件
      app.component(key, allGlobalComponent[key])
    })
  },
}
