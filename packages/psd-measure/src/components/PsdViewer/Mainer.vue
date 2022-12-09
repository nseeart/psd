<style lang="scss" scoped>
@import "base";
.viewer-mainer {
    background-color: #f9f9f9;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
}
.dot-grid {
    min-width: 100%;
    min-height: 100%;
    background-image: url("~/assets/images/dot_bg.png");
    background-position: top left;
    background-size: px2rem(16) px2rem(16);
    padding: px2rem(100);
    overflow: hidden;
}
.viewer-container {
    width: 100%;
    height: 100%;
    position: relative;
    .thumb {
        position: relative;
        z-index: 1;
        top: 0;
        left: 0;
    }
}
.layers {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    top: 0;
    left: 0;
}
</style>

<template>
    <div class="viewer-mainer">
        <div
            class="dot-grid"
            :style="dotGridStyles"
            @click="handleCancelLayerClick"
        >
            <drop-box v-if="!data.isPsd" />
            <div class="viewer-container" :style="thumbStyles">
                <div class="layers" :style="thumbStyles">
                    <view-layer />
                </div>
                <div class="thumb" :style="thumbStyles">
                    <img
                        v-if="data.src"
                        :width="data.width"
                        :height="data.height"
                        :src="data.src"
                    />
                </div>
                <!--<img crossorigin="anonymous" id="screenImage" class="noSelect" src="https://cdn.zeplin.io/58661f40855c2939685bcf12/screens/91eedc48-c4dc-4ab7-950a-066c93390aa2.png" style="width: 960px; height: 540px;">-->
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import DropBox from "./DropBox.vue";
import ViewLayer from "./ViewLayer.vue";
import { useStore } from "vuex";
import { reactive, computed, watch } from "vue";
const store = useStore();
const data = reactive({
    isPsd: false,
    width: 0,
    height: 0,
    src: null,
    padding: 100,
});

const thumb = computed(() => store.getters["getPsdPng"]);
const dotGridStyles = computed(() => {
    return {
        width: data.width + data.padding + "px",
        height: data.height + data.padding + "px",
    };
});
const thumbStyles = computed(() => {
    return {
        width: data.width + "px",
        height: data.height + "px",
    };
});

watch(thumb, ({ width, height, src }, oldVal) => {
    if (width > 0 && height > 0) {
        data.width = width;
        data.height = height;
        data.isPsd = true;
        let image = new Image();
        image.onload = () => {
            data.src = src;
        };
        image.src = src;
    }
});

const handleCancelLayerClick = () => {
    store.dispatch("handleCancelLayer");
};
</script>
