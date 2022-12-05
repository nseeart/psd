<style lang="scss" scoped>
@import "base";
.layers-inner {
    position: relative;
    width: 100%;
    height: 100%;
}
.layer-select {
    z-index: 2;
    position: relative;
    width: 100%;
    height: 100%;
}
.layer-list {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 3;
    top: 0;
    left: 0;
    overflow: hidden;
}
.layer {
    position: absolute;
}
.layer-rect-lr,
.layer-rect-tb,
.layer-rect-middle {
    position: absolute;
}
.layer-rect-lr {
    border-top: 1px dashed $viewer-select-line-color;
    border-bottom: 1px dashed $viewer-select-line-color;
    left: 0;
    right: 0;
    z-index: 1;
}
.layer-rect-tb {
    bottom: 0;
    border-left: 1px dashed $viewer-select-line-color;
    border-right: 1px dashed $viewer-select-line-color;
    top: 0;
    z-index: 2;
}
.layer-rect-middle {
    z-index: 3;
    border: 1px solid $viewer-select-line-color;
}
[class*="layer-dot-"] {
    width: 5px;
    height: 5px;
    border: 1px solid $viewer-select-line-color;
    background-color: #fff;
    position: absolute;
    border-radius: 5px;
}
.layer-dot-tl {
    top: -3px;
    left: -3px;
}
.layer-dot-tr {
    top: -3px;
    right: -3px;
}
.layer-dot-bl {
    bottom: -3px;
    left: -3px;
}
.layer-dot-br {
    bottom: -3px;
    right: -3px;
}
.layer-over {
    z-index: 1;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
}
.layer-over-rect {
    position: absolute;
    border: 1px solid $viewer-over-line-color;
}
.layer-rect-attr {
    position: absolute;
    background-color: $viewer-select-line-color;
    border-radius: 2px;
    padding: px2rem(6) px2rem(12) px2rem(8);
    line-height: 1;
    color: #fff;
    font-size: px2rem(24);
}
.layer-rect-width {
    transform: translateX(-50%);
}
.layer-rect-height {
    transform: translateY(-50%);
}
.layer-over-line {
    position: absolute;
    background-color: $viewer-select-line-color;
}
.layer-rect-attr-over {
    position: absolute;
    background-color: $viewer-select-line-color;
    border-radius: 2px;
    padding: px2rem(6) px2rem(12) px2rem(8);
    line-height: 1;
    color: #fff;
    font-size: px2rem(24);
}
</style>

<template>
    <div class="layers-inner">
        <div class="layer-select" v-if="isSelectLayer">
            <div
                class="layer-rect-lr"
                :style="{
                    top: selectLayer.top + 'px',
                    height: selectLayer.height + 'px',
                }"
            ></div>
            <div
                class="layer-rect-tb"
                :style="{
                    left: selectLayer.left + 'px',
                    width: selectLayer.width + 'px',
                }"
            ></div>
            <div
                class="layer-rect-middle"
                :style="{
                    left: selectLayer.left + 'px',
                    top: selectLayer.top + 'px',
                    width: selectLayer.width + 'px',
                    height: selectLayer.height + 'px',
                }"
            >
                <span class="layer-dot-tl"></span>
                <span class="layer-dot-tr"></span>
                <span class="layer-dot-bl"></span>
                <span class="layer-dot-br"></span>
            </div>
            <div
                class="layer-rect-attr layer-rect-width"
                v-if="selectLayerAttr.width.isShow"
                :style="{
                    top: selectLayerAttr.width.top + 'px',
                    left: selectLayerAttr.width.left + 'px',
                }"
            >
                {{ selectLayer.width + "px" }}
            </div>
            <div
                class="layer-rect-attr layer-rect-height"
                v-if="selectLayerAttr.height.isShow"
                :style="{
                    top: selectLayerAttr.height.top + 'px',
                    left: selectLayerAttr.height.left + 'px',
                }"
            >
                {{ selectLayer.height + "px" }}
            </div>
        </div>
        <div class="layer-over">
            <div
                class="layer-over-rect"
                :style="{
                    left: overLayer.left + 'px',
                    top: overLayer.top + 'px',
                    width: overLayer.width + 'px',
                    height: overLayer.height + 'px',
                }"
            ></div>
            <template v-for="attr in overLayerAttr.vertical" v-if="attr.isShow">
                <div
                    class="layer-over-line"
                    :style="{
                        top: attr.top + 'px',
                        height: attr.height + 'px',
                        left: attr.left + 'px',
                        width: attr.width + 'px',
                    }"
                ></div>
                <div
                    class="layer-over-line"
                    :style="{
                        top: attr.top + 'px',
                        height: '1px',
                        left: attr.left - 2 + 'px',
                        width: '5px',
                    }"
                ></div>
                <div
                    class="layer-over-line"
                    :style="{
                        top: attr.top + attr.height + 'px',
                        height: '1px',
                        left: attr.left - 2 + 'px',
                        width: '5px',
                    }"
                ></div>
                <div
                    class="layer-rect-attr-over layer-rect-height"
                    :style="{
                        top: attr.top + attr.height / 2 + 'px',
                        left: attr.left + attr.width / 2 + 5 + 'px',
                    }"
                >
                    {{ attr.height + "px" }}
                </div>
            </template>
            <template
                v-for="attr in overLayerAttr.horizontal"
                v-if="attr.isShow"
            >
                <div
                    class="layer-over-line"
                    :style="{
                        top: attr.top + 'px',
                        width: attr.width + 'px',
                        left: attr.left + 'px',
                        height: attr.height + 'px',
                    }"
                ></div>
                <div
                    class="layer-over-line"
                    :style="{
                        top: attr.top - 2 + 'px',
                        width: '1px',
                        left: attr.left + 'px',
                        height: '5px',
                    }"
                ></div>
                <div
                    class="layer-over-line"
                    :style="{
                        top: attr.top - 2 + 'px',
                        width: '1px',
                        left: attr.left + attr.width + 'px',
                        height: '5px',
                    }"
                ></div>
                <div
                    class="layer-rect-attr-over layer-rect-width"
                    :style="{
                        top: attr.top + 5 + 'px',
                        left: attr.left + attr.width / 2 + 'px',
                    }"
                >
                    {{ attr.width + "px" }}
                </div>
            </template>
        </div>
        <div class="layer-list">
            <div
                class="layer"
                v-for="(layer, index) in layers"
                :style="{
                    width: layer.width + 'px',
                    height: layer.height + 'px',
                    left: layer.left + 'px',
                    top: layer.top + 'px',
                    'z-index': layer.zIndex,
                }"
                @click="handleLayerClick($event, index, layer)"
                @mouseover="handleLayerOver($event, index, layer)"
                @mouseout="handleLayerOut($event, index, layer)"
            ></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { mapGetters, mapActions, useStore } from "vuex";
import Distance from "@/core/distance";
import { ref, computed, reactive } from "vue";

const store = useStore();
const DISTANCE = 5;

const selectLayer = ref({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
});
const selectLayerAttr = ref({
    width: {
        isShow: false,
        top: 0,
        left: 0,
    },
    height: {
        isShow: false,
        top: 0,
        left: 0,
    },
});
const overLayer = ref({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
});
const overLayerAttr = ref({
    horizontal: [],
    vertical: [],
});
const selectIndex = ref(null);
const overIndex = ref(null);

const layers = computed(() => store.getters["getLayers"]);
const isSelectLayer = computed(() => store.getters["getSelectLayerStatus"]);
const docuement = computed(() => store.getters["getPsdDocument"]);

// ...mapActions(["handleSelectLayer"]),
const handleLayerClick = (ev, index, layer) => {
    ev.stopPropagation();
    ev.preventDefault();
    // this.handleSelectLayer();
    store.dispatch("setLayerItem", layer);
    store.dispatch("getImage", layer.id);
    overLayer.value = layer;
    selectLayerAttr.value = getClickAttr(layer);
    selectIndex.value = index;
    if (overIndex.value === index) {
        overLayerAttr.value.horizontal.forEach((item, index) => {
            overLayerAttr.value.horizontal[index].isShow = false;
        });
        overLayerAttr.value.vertical.forEach((item, index) => {
            overLayerAttr.value.vertical[index].isShow = false;
        });
    }
};
function getClickAttr(currentLayer) {
    return {
        width: {
            isShow: true,
            top: currentLayer.top + currentLayer.height + DISTANCE,
            left: currentLayer.left + currentLayer.width / 2,
        },
        height: {
            isShow: true,
            top: currentLayer.top + currentLayer.height / 2,
            left: currentLayer.left + currentLayer.width + DISTANCE,
        },
    };
}
const handleLayerOver = (ev, index, layer) => {
    ev.stopPropagation();
    ev.preventDefault();
    overLayer.value = layer;
    overIndex.value = index;
    overLayerAttr.value = getOverAttr(layer);
    if (overIndex.value !== index) {
        for (let key in selectLayerAttr.value) {
            selectLayerAttr.value[key].isShow = false;
        }
    } else {
        for (let key in selectLayerAttr.value) {
            selectLayerAttr.value[key].isShow = true;
        }
        overLayerAttr.value.horizontal.forEach((item, index) => {
            overLayerAttr.value.horizontal[index].isShow = false;
        });
        overLayerAttr.value.vertical.forEach((item, index) => {
            overLayerAttr.value.vertical[index].isShow = false;
        });
    }

    console.log("selectLayerAttr", selectLayerAttr.value);
};
const handleLayerOut = ($event, index, layer) => {
    // this.width.isShow = false
    // this.height.isShow = false
};
const getOverAttr = (currentLayer) => {
    let distance = new Distance(selectLayer.value, currentLayer);
    // 垂直
    let vertical = distance.vertical();
    let horizontal = distance.horizontal();
    return {
        vertical,
        horizontal,
    };
};
</script>
