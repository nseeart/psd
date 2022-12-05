<style lang="scss" scoped>
@import "base";
.drop-bar {
    height: 100%;
    width: px2rem(16);
    // width: px2rem(32);
    background-color: #eee;
    position: relative;
    overflow: hidden;
    cursor: col-resize;
    ul {
        padding: 0 px2rem(4);
        transform: translate3d(-50%, -50%, 0);
        position: absolute;
        top: 50%;
        left: 50%;
    }
    li {
        display: inline-block;
        width: px2rem(8);
        height: px2rem(8);
        border-radius: px2rem(8);
        background-color: #666666;
        margin-top: px2rem(20);
        &:nth-child(1) {
            margin-top: 0;
        }
    }
}
</style>

<template>
    <div
        class="left drop-bar"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
        ref="dropBarRef"
    >
        <ul>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { getWinWidth } from "@/core/utils";
import { useStore } from "vuex";
import { ref } from "vue";
const store = useStore();

const dropBarRef = ref();
const handleMouseDown = (event: any) => {
    // console.log('handleMouseDown', event)
    event.stopPropagation();
    event.preventDefault();
    let width = getAsideWidth();
    let { pageX } = event;

    store.dispatch("mouseDown", {
        pageX,
        isDrop: true,
        width,
    });
    store.dispatch("setAsideDownWidth", width);
};
const handleMouseUp = (event: any) => {
    // console.log('handleMouseUp', event)
    event.stopPropagation();
    event.preventDefault();
    store.dispatch("setDropFlag", false);
};
function getAsideWidth() {
    return getWinWidth() - dropBarRef.value.getBoundingClientRect().right;
}
</script>
