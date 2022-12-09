<template>
    <section class="mainer">
        <div class="get-started">
            <span class="btn-get-started" @mouseover="handleToggle(true)"
                >Get started free</span
            >
            <div class="btn-hover" v-show="isHover">
                <div class="dashed-v"></div>
                <div class="dashed-h"></div>
                <div class="border" @mouseout="handleToggle(false)">
                    <div class="border-tl"></div>
                    <div class="border-tr"></div>
                    <div class="border-bl"></div>
                    <div class="border-br"></div>
                    <router-link
                        class="link-get-started"
                        :to="{ path: 'demo' }"
                    ></router-link>
                </div>
                <div class="height">90px</div>
                <div class="width">454px</div>
            </div>
        </div>
        <div class="description">
            <dl>
                <dd>
                    <span class="icon icon-designers">
                        <el-icon><UserFilled /></el-icon>
                        <i class="iconfont icon-upload"></i>
                    </span>
                    <p>Designers</p>
                </dd>
                <dd>
                    <span class="icon icon-developers">
                        <el-icon><Avatar /></el-icon>
                        <i class="iconfont icon-view"></i>
                    </span>
                    <p>Developers</p>
                </dd>
                <dt>
                    PSD.work is a collaboration tool between designer and
                    developer.
                </dt>
            </dl>
        </div>
        <div class="coffee">
            <dl>
                <dt>
                    <span class="icon">
                        <i class="iconfont icon-coffee"></i>
                    </span>
                    <p>If we can help you, please have a cup of coffee.</p>
                </dt>
                <dd>
                    <div class="qr-code qr-code-alipay"></div>
                </dd>
                <dd>
                    <div class="qr-code qr-code-wechat"></div>
                </dd>
            </dl>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElIcon } from "element-plus";
import { Avatar, UserFilled } from "@element-plus/icons-vue";
const isHover = ref(false);
const handleToggle = (type: boolean) => {
    isHover.value = type;
};
</script>

<style lang="scss" scoped>
@import "base";
.mainer {
    background-color: #fff;
}
.get-started {
    height: px2rem(900);
    overflow: hidden;
    position: relative;
}
.btn-get-started {
    display: block;
    width: px2rem(452);
    line-height: px2rem(88);
    margin: 0 auto;
    border-radius: px2rem(6);
    background-color: #00a8ff;
    color: #fff;
    text-align: center;
    margin-top: px2rem(248);
    font-size: px2rem(36);
    position: relative;
    z-index: 1;
}
.btn-hover {
    width: px2rem(1000);
    height: px2rem(392);
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: px2rem(100);
    margin-left: px2rem(-500);
    z-index: 2;
    .dashed-v,
    .dashed-h {
        position: absolute;
        z-index: 1;
        border: 1px dashed $viewer-select-line-color;
    }
    .dashed-v {
        width: px2rem(452);
        height: 100%;
        left: px2rem(274);
        border-top: 0;
        border-bottom: 0;
    }
    .dashed-h {
        width: 100%;
        height: px2rem(88);
        top: px2rem(148);
        border-left: 0;
        border-right: 0;
    }
    .border {
        position: absolute;
        top: px2rem(148);
        left: px2rem(274);
        width: px2rem(452);
        height: px2rem(88);
        border: 1px solid $viewer-select-line-color;
        z-index: 2;
        > div {
            border: 1px solid $viewer-select-line-color;
            width: px2rem(10);
            height: px2rem(10);
            border-radius: 5px;
            background-color: #fff;
            position: absolute;
            z-index: 1;
        }
    }
    .link-get-started {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .border-tl {
        top: -3px;
        left: -3px;
    }
    .border-tr {
        top: -3px;
        right: -3px;
    }
    .border-bl {
        bottom: -3px;
        left: -3px;
    }
    .border-br {
        bottom: -3px;
        right: -3px;
    }
    .height,
    .width {
        display: inline-block;
        background-color: $viewer-select-line-color;
        position: absolute;
        font-size: px2rem(28);
        padding: 0 px2rem(12);
        border-radius: px2rem(6);
        color: #fff;
        line-height: 1.375;
    }
    .height {
        top: px2rem(172);
        left: px2rem(738);
    }
    .width {
        top: px2rem(248);
        left: px2rem(452);
    }
}
.description {
    text-align: center;
    padding: px2rem(150) 0;
    dl {
        &:after {
            display: block;
            content: "";
            width: 100%;
            height: 0;
            clear: both;
        }
        dd {
            display: inline-block;
            width: px2rem(452);
            .icon {
                display: block;
                width: px2rem(180);
                height: px2rem(180);
                line-height: px2rem(180);
                margin: 0 auto;
                border-radius: px2rem(180);
                border: 1px solid #ddd;
                i {
                    font-size: px2rem(74);
                    color: #999999;
                }
            }
            p {
                color: #00a8ff;
                font-size: px2rem(36);
                line-height: px2rem(118);
            }
        }
        dt {
            color: #666666;
            font-size: px2rem(32);
            line-height: 1.375;
            padding-top: px2rem(6);
        }
    }
}
.coffee {
    text-align: center;
    padding: px2rem(100) 0;
    .icon {
        display: block;
        width: px2rem(180);
        height: px2rem(180);
        text-align: center;
        margin: 0 auto;
    }
    .icon-coffee {
        font-size: px2rem(100);
        color: #999999;
    }
    p {
        color: #666666;
        line-height: 1.375;
    }
    dd {
        padding: px2rem(64) 0;
    }
    .qr-code {
        width: px2rem(300);
        height: px2rem(300);
        margin: 0 auto;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: px2rem(300) px2rem(300);
    }
    .qr-code-alipay {
        background-image: url(../../../assets/images/home/qr_code_alipay.png);
    }
    .qr-code-wechat {
        background-image: url(../../../assets/images/home/qr_code_wechat.png);
    }
    dd {
        display: inline-block;
        width: px2rem(360);
    }
}
</style>
