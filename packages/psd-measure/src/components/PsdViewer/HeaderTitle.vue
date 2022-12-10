<template>
    <div class="header-title">
        <div class="header-title-inner">
            <i class="iconfont icon-back disabled"></i>
            <span class="title">Dashboard</span>
            <i class="iconfont icon-go"></i>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import "base";
.header-title {
    height: inherit;
    display: flex;
    align-items: center;
}
.header-title-inner {
    max-width: px2rem(400);
    margin: auto;
    .title {
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    i,
    span {
        vertical-align: middle;
        color: #666666;
    }
    i {
        &.disabled {
            color: #cfcfcf;
        }
    }
}
</style>
