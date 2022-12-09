<template>
    <div class="psd-page" @mousemove="handleMouseMove" @mouseup="handleMouseUp">
        <Header />
        <div class="psd-viewer">
            <div
                class="right viewer-frame-aside"
                :class="{ show: isShow }"
                ref="frameAside"
            >
                <DropBar />
                <Aside />
            </div>
            <div class="auto viewer-frame-mainer">
                <Mainer />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Header from "@services/PsdViewer/Header.vue";
import Mainer from "@services/PsdViewer/Mainer.vue";
import Aside from "@services/PsdViewer/Aside.vue";
import DropBar from "@services/PsdViewer/DropBar.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const moveX = ref(0);
const currentAsideWidth = ref(0);

const isShow = computed(() => store.getters["getAsideDisaplayStatus"]);
const asideDownWidth = computed(() => store.getters["getAsideDownWidth"]);
const asideDefaultWidth = computed(() => store.getters["getAsideDefaultWidth"]);
const asideWidth = computed(() => store.getters["getAsideWidth"]);
const pageX = computed(() => store.getters["getPageX"]);
const isDrop = computed(() => store.getters["getIsDropStatus"]);

const handleMouseMove = (event: any) => {
    event.stopPropagation();
    // event.preventDefault()

    if (store.state.isDrop) {
        moveX.value = pageX.value - event.pageX;
        currentAsideWidth.value = moveX.value + asideDownWidth.value;
        if (moveX.value >= 0) {
            if (currentAsideWidth.value > asideDefaultWidth.value) {
                store.dispatch("setAsideWidth", currentAsideWidth.value);
            }
        } else {
            if (currentAsideWidth.value > asideDefaultWidth.value) {
                store.dispatch("setAsideWidth", currentAsideWidth.value);
            }
        }
    } else {
        return false;
    }
};
const handleMouseUp = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    store.dispatch("setDropFlag", false);
    if (currentAsideWidth.value < asideDefaultWidth.value) {
        if (moveX.value > 0) {
            store.dispatch("setAsideWidth", asideDefaultWidth.value);
            store.dispatch("toggleAsideStatus", true);
        } else {
            store.dispatch("setAsideWidth", 0);
            store.dispatch("toggleAsideStatus", false);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "base";
.psd-page {
    height: 100vh;
    width: 100vw;
    position: relative;
}
.psd-viewer {
    height: calc(100% - #{px2rem(120)});
    background-color: #f9f9f9;
}
.viewer-frame-mainer {
    height: 100%;
}
.viewer-frame-aside {
    height: 100%;
    width: auto;
    .drop-bar {
        width: px2rem(32);
    }
    &.show {
        .drop-bar {
            width: px2rem(16);
        }
    }
}
</style>
