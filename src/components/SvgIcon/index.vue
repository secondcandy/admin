<template>
    <svg :style="{ width, height }">
        <!-- xlink:herf 执行用哪一个属性，属性值务必是#icon-图标名字 -->
        <!-- use标签fill属性可以设置图标颜色 -->
        <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
</template>

<script setup lang="ts">
// 接收父组件传递过来的参数
defineProps({
    // xlink:herf属性值前缀
    prefix: {
        type: String,
        default: '#icon-'
    },
    // 提供使用图标的名字
    name: String,
    // 接收父组件传递的颜色
    color: {
        type: String,
        default: ''
    },
    // 接收父组件传递过来的图标宽度
    width: {
        type: String,
        default: '16px'
    },
    height: {
        type: String,
        default: '16px'
    }
})
</script>

<style scoped></style>

