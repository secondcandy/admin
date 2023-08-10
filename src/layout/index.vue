<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ fold: LayOutSettingStore.fold }">
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu :collapse="LayOutSettingStore.fold" :default-active="$route.path" background-color="#001529"
          text-color="white" :collapse-transition="false">
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{ fold: LayOutSettingStore.fold }">
      <!-- layout组件的顶部导航tabbar -->
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区 -->
    <div class="layout_main" :class="{ fold: LayOutSettingStore.fold }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
// 左侧菜单logo子组件
import Logo from './logo/index.vue'
// 引入菜单组件
import Menu from './menu/index.vue'
// 获取仓库内存储的路由信息
import useUserStore from '@/store/modules/user'
// 引入layout设置小仓库
import useLayOutSettingStore from '@/store/modules/setting'
// 右侧内容的展示区域
import Main from '@/layout/main/index.vue'
// 获取路由对象
import { useRoute } from 'vue-router'
// 引入tabbar组件
import Tabbar from './tabbar/index.vue'
let userStore = useUserStore()

// 获取路由对象
let $route = useRoute()
// 获取layout配置仓库
let LayOutSettingStore = useLayOutSettingStore()
</script>

<script lang="ts">
export default {
  name: 'Layout'
}
</script>
<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    color: white;
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    position: fixed;
    left: $base-menu-width;
    top: 0;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    h1 {
      height: 5000px;
    }

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}</style>
