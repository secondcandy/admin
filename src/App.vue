// eslint-disable-next-line no-unused-vars
<template>
  <div class="container">
    <el-button>默认按钮</el-button>
    <el-button type="danger" :icon="Plus" size="default">el危险按钮</el-button>
    <el-button type="primary" size="small">el主要按钮</el-button>
    <el-button type="info" :icon="Edit">el信息按钮</el-button>
    <el-button type="success">el成功按钮</el-button>
    <el-button type="warning">el警告按钮</el-button>
    <el-calendar v-model="vlaue"></el-calendar>
  </div>
</template>

<script setup lang="ts">
// 引入图标组件
// @ts-ignore
import {Plus,Edit} from '@element-plus/icons-vue'
import {ref} from 'vue'
let vlaue =ref(new Date())
</script>

<style lang="scss">
.container {
  background: lightblue;
  width: 400px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}
</style>
