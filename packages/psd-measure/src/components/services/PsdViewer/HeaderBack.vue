<style lang="scss" scoped>
@import "./base";
.btn-back {
    display: block;
    line-height: px2rem(32);
    padding: px2rem(44) 0;
    color: #999999;
    &:hover {
        i,
        span {
            color: #666;
        }
    }
}
.icon-back {
    color: #cfcfcf;
}
</style>

<template>
    <div class="left header-back">
        <a class="btn-back" @click="handleBack">
            <i class="iconfont icon-back"></i>
            <span>Home</span>
        </a>
    </div>
</template>

<script lang="ts">
export default {
    methods: {
        handleBack() {
            this.$router.push({ path: "/" });
        },
    },
};
</script>
