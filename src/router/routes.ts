// 对外暴露配置的路由(常量路由)
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', // 命名路由
  },
  {
    // 登录成功展示数据的路由
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
  },
  {
    // 404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
  },
]
