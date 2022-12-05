<style lang="scss" scoped>
@import "base";
.css-code {
    position: relative;
    height: auto;
    margin: -px2rem(16) 0;
    .num {
        position: absolute;
        left: 0;
        top: 0;
        width: px2rem(32);
        background-color: #676767;
        height: 100%;
    }
    .pre {
        padding: px2rem(10) 0;
        padding-left: px2rem(32);
        width: 100%;
        height: auto;
        overflow: hidden;
        background-color: #333333;
        .code {
            font-size: 0;
        }
    }
    .code-mirror-line {
        padding: 0 px2rem(10);
        position: relative;
        &:before {
            content: "";
            display: inline-block;
            width: px2rem(12);
            height: px2rem(12);
            border-radius: px2rem(12);
            background-color: #333333;
            position: absolute;
            top: px2rem(17);
            left: -px2rem(23);
        }
    }
    span {
        font-size: px2rem(26);
        line-height: 1.75;
        color: #fff;
    }
    .hl-class-name {
        color: #ffb401;
    }
    .hl-key {
        color: #27f4ff;
        margin-left: px2rem(64);
    }
    .hl-value-number {
        color: #7de01c;
    }
    [class*="hl-value-"] {
        margin-left: px2rem(16);
    }
    .hl-value-stirng {
        color: #ff308d;
    }
}
</style>

<template>
    <div class="css-code">
        <div class="num"></div>
        <div class="pre auto">
            <div class="code css" v-if="codeData.className">
                <div class="code-mirror-line">
                    <span class="dot">.</span>
                    <span :class="{ [codeData.className.type]: true }">{{
                        codeData.className.value
                    }}</span>
                    <span>{</span>
                </div>
                <div
                    v-if="codeData.attributes.base"
                    class="code-mirror-line"
                    v-for="item in codeData.attributes.base"
                >
                    <span :class="{ [item.keyType]: true }">{{
                        item.keyValue
                    }}</span>
                    <span>:</span>
                    <span :class="{ [item.valueType]: true }">{{
                        item.valueValue
                    }}</span>
                    <span>;</span>
                </div>
                <div
                    v-if="codeData.attributes.font"
                    class="code-mirror-line"
                    v-for="item in codeData.attributes.font"
                >
                    <span :class="{ [item.keyType]: true }">{{
                        item.keyValue
                    }}</span>
                    <span>:</span>
                    <span :class="{ [item.valueType]: true }">{{
                        item.valueValue
                    }}</span>
                    <span>;</span>
                </div>
                <div class="code-mirror-line"><span>}</span></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        codeData: {
            type: Object,
            default: {},
        },
    },
    mounted() {
        // console.log('codeData', this.codeData)
    },
};
</script>
