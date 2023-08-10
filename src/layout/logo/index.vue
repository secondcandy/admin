<template>
    <div class="logo" v-if="Setting.logoHidden">
        <img :src="Setting.logo" />
        <p>{{ Setting.title }}</p>
    </div>
</template> 

<script setup lang="ts">
import Setting from '@/setting'
</script>

<script lang="ts">
export default {
    name: 'Logo'
}
</script>

<style scoped lang="scss">
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    display: flex;
    align-items: center;
    padding: 10px;

    img {
        width: 40px;
        height: 40px;
    }

    p {
        font-size: $base-logo-title-fontSzie;
        margin-left: 10px;
        white-space: nowrap;
    }
}
</style>
