// 创建用户相关小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin } from '@/api/user'
// 引入类型定义
import type { loginForm, loginResponseData } from '@/api/user/type'
// 引入小仓库state类型
import type { UserState } from './types/type'
// 引入操作本地存储的工具方法
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'

// 创建用户小仓库
let userStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用户唯一标识
    }
  },
  // 异步|逻辑
  actions: {
    // 用户登录的方法
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      // 登录请求:成功200->token
      // 登录请求:失败201->登录失败的错误信息
      if (result.code == 200) {
        // pinia仓库存储token
        // 由于pinia|vuex存储数据利用的其实是js对象
        this.token = result.data.token as string
        //本地存储持久化token
        SET_TOKEN(result.data.token as string)
        // 能保证当前的async函数能返回一个成功的promise
        return 'OK'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  // 计算属性
  getters: {},
})
// 对外暴露获取小仓库方法
export default userStore
