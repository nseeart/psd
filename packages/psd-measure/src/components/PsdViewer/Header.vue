<template>
    <header class="header">
        <header-back />
        <header-title />
        <header-user />
    </header>
</template>

<script lang="ts" setup>
import HeaderBack from "./HeaderBack.vue";
import HeaderTitle from "./HeaderTitle.vue";
import HeaderUser from "./HeaderUser.vue";
</script>

<style lang="scss" scoped>
@import "base";
.header {
    width: 100%;
    padding: 0 px2rem(32);
    height: px2rem(96);
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.02);
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 2;
}
</style>
