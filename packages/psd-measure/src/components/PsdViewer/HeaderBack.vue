<style lang="scss" scoped>
@import "./base";
.header-back {
    display: flex;
    align-items: center;
    height: inherit;
}
.btn-back {
    display: block;
    color: #666;
    &:hover {
        cursor: pointer;
        i,
        span {
            color: #0295e1;
        }
    }
}
.icon-back {
    color: #cfcfcf;
}
</style>

<template>
    <div class="header-back">
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
