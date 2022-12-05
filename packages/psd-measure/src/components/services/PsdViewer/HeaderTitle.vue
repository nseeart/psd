<style lang="scss" scoped>
@import "base";
.header-title-inner {
    padding-top: px2rem(32);
    height: px2rem(44);
    line-height: px2rem(44);
    max-width: px2rem(400);
    margin: auto;
    .title {
        display: inline-block;
        padding: 0 px2rem(72);
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

<template>
    <div class="header-title">
        <div class="header-title-inner">
            <i class="iconfont icon-back disabled"></i>
            <span class="title">帮助页面</span>
            <i class="iconfont icon-go"></i>
        </div>
    </div>
</template>
