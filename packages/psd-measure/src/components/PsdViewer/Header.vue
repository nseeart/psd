<template>
    <header class="header">
        <header-back />
        <header-user />
        <header-title />
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
}
</style>
