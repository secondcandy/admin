// 创建用户相关小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// 引入返回数据以及发送请求数据类型
import type { loginFormData, loginResponseData, userInfoResponseData } from '@/api/user/type'
// 引入小仓库state类型
import type { UserState } from './types/type'
// 引入操作本地存储的工具方法
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入路由信息(常量路由)
import { constantRoute } from '@/router/routes'
// 创建用户小仓库
let userStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用户唯一标识
      menuRoutes: constantRoute, // 仓库存储生成菜单需要的数据(路由)
      username: '',
      avatra: ''
    }
  },
  // 异步|逻辑
  actions: {
    // 用户登录的方法
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data)
      // 登录请求:成功200->token
      // 登录请求:失败201->登录失败的错误信息
      if (result.code == 200) {
        // pinia仓库存储token
        // 由于pinia|vuex存储数据利用的其实是js对象
        this.token = result.data as string
        //本地存储持久化token
        SET_TOKEN(result.data as string)
        // 能保证当前的async函数能返回一个成功的promise
        return 'OK'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    // 获取用户信息的方法
    async userInfo() {
      // 获取用户信息存储于仓库中[头像，名字]
      let result: userInfoResponseData = await reqUserInfo();
      // 如果获取用户信息成功，则进行存储
      if (result.code == 200) {
        this.username = result.data.name
        this.avatra = result.data.avatar
        return 'OK'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 用户退出登录方法
    async userLogout() {
      // 退出登录请求
      let result:any = await reqLogout();
      if (result.code == 200) {
        this.token = ''
        this.username = '',
          this.avatra = '',
          REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }

    }
  },
  // 计算属性
  getters: {},
})
// 对外暴露获取小仓库方法
export default userStore
