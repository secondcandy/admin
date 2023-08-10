// 路由鉴权文件：鉴权，项目中的路由内否被访问的权限设置(某一个路由什么条件下可以访问、什么条件下不可以访问)
import router from '@/router/index'
import nprogress from 'nprogress'
// 引入进度条样式
import "nprogress/nprogress.css"
import setting from './setting'
nprogress.configure({ showSpinner: false })
// 获取用户相关的小仓库内部token数据,去判断用户是否成功登录
import useUserStore from '@/store/modules/user'
// 由于permission文件在创建大仓库前就会被入口文件加载，因此需要在permission文件内执行大仓库的注册，才能获取小仓库数据
import pinia from './store'
let userStore = useUserStore(pinia)


// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    document.title = `${setting.title} | ${to.meta.title}`
    // to:你将要访问哪个路由
    // from:你从哪个路由而来
    // next:路由的放行函数
    // 访问某一个路由之前触发守卫
    nprogress.start();
    // 获取用户的名字
    let username = userStore.username
    // 获取token判断用户是否登录
    let token = userStore.token
    if (token) {
        if (to.path == '/login') {
            next({ path: '/' })
        } else {
            // 登录成功访问其余六个路由
            // 有用户信息
            if (username) {
                next()
            } else {// 没有用户信息,在守卫发请求获取用户信息再放行
                try {
                    // 获取用户信息
                    await userStore.userInfo()
                    next()
                } catch (error) {
                    //token过期:获取不到用户信息
                    //用户手动修改了本地存储的token
                    // 退出登录->用户相关数据清空
                    await userStore.userLogout()
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        }
    } else {
        if (to.path == '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }
})
// 全局后置守卫
router.afterEach((to, from) => {
    nprogress.done()
})

// 第一个问题:任意路由切换，实现进度条业务 nprogress
// 第二个问题:路由鉴权
// 全部的路由组件：登录|404|任意路由|首页|数据大屏|权限管理(三个子路由)|商品管理(四个子路由)

// 用户未登录：可以访问login，其余六个路由指向login
// 用户登录成功：不能访问login[指向首页]，其余的路由可以访问