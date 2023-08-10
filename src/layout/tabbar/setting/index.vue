<template>
    <el-button size="small" icon="Refresh" circle @click="updateRefresh"></el-button>
    <el-button size="small" icon="FullScreen" circle @click="fullscreen"></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img :src="userStore.avatra" alt="" style="width: 24px;height: 24px;margin: 0 10px;border-radius: 50%;">
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon-right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
// 获取骨架小仓库
import useLayOutSettingStore from '@/store/modules/setting';
// 获取用户数据仓库
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
let $router = useRouter()
let $route = useRoute()
// 创建用户数据仓库实例对象
let userStore = useUserStore()

let layOutSettingStore = useLayOutSettingStore()

// 刷新按钮点击的回调
const updateRefresh = () => {
    layOutSettingStore.refresh = !layOutSettingStore.refresh
}

// 全屏按钮点击的回调
const fullscreen = () => {
    // DOM对象的一个属性，可以用来判断当前是否全屏
    let full = document.fullscreenElement
    if (!full) {
        // 利用文档的根节点方法requestFullscreen，实现全屏模式
        document.documentElement.requestFullscreen();
        layOutSettingStore.fold = !layOutSettingStore.fold
    } else {
        // 退出全屏模式
        document.exitFullscreen()
        layOutSettingStore.fold = !layOutSettingStore.fold
    }
}

// 退出登录点击的回调
const logOut = async () => {
    // 首先：需要向服务器发送请求[退出登录接口]
    // 其次：清空仓库中关于用户的相关信息[token|username|avatar]
    await userStore.userLogout()
    // 最后：跳转到登录页面
    $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<script lang="ts">
export default {
    name: 'Setting'
}
</script>

<style scoped></style>
