<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">123</div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar">456</div>
    <!-- 内容展示区 -->
    <div class="layout_main">
      <h1>dsdsadsa</h1>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    color: white;
  }

  .layout_tabbar {
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background: lightgoldenrodyellow;
    position: fixed;
    left: $base-menu-width;
    top: 0;
  }

  .layout_main {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background: lightgreen;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;

    h1 {
      height: 5000px;
    }
  }
}
</style>
