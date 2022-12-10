<style lang="scss" scoped>
@import "base";
.header-user {
    display: flex;
    height: inherit;
}
.header-avatar {
    padding: px2rem(16) 0;
    span {
        display: block;
        width: px2rem(64);
        height: px2rem(64);
        border-radius: px2rem(64);
        background-color: #dddddd;
    }
}
.header-user {
    ul {
        padding: px2rem(36) 0;
    }
    li {
        margin-right: px2rem(70);
    }
    li > .icon {
        display: block;
        width: px2rem(48);
        height: px2rem(48);
        line-height: px2rem(48);
        position: relative;
        &:hover {
            cursor: pointer;
            .iconfont {
                color: #666;
            }
        }
    }
    .red-dot {
        width: px2rem(13);
        heihgt: px2rem(13);
        border-radius: px2rem(13);
        background-color: #fff;
        position: absolute;
        top: 0;
        right: 0;
    }
    .iconfont {
        font-size: px2rem(48);
        color: #999999;
    }
}
</style>

<template>
    <div class="header-user">
        <div class="right header-avatar">
            <span></span>
        </div>
        <!-- <ul class="right li-left clear">
            <li>
                <router-link class="icon" :to="{ path: '/' }">
                    <i class="iconfont icon-home"></i>
                </router-link>
            </li>
            <li>
                <span class="icon">
                    <i class="iconfont icon-message"></i>
                    <em class="red-dot"></em>
                </span>
            </li>
        </ul> -->
    </div>
</template>
