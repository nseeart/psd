<style lang="scss" scoped>
@import "base";
.drop-box {
    width: px2rem(642);
    height: px2rem(360);
    text-align: center;
    border: 1px dashed #aaa;
    padding: px2rem(70) 0;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -px2rem(180);
    margin-left: -px2rem(321);
    .icon-upload {
        font-size: px2rem(100);
        color: #aaaaaa;
    }
    span {
        display: block;
        font-size: px2rem(30);
        color: #999;
    }
}
</style>

<template>
    <div class="drop-box">
        <i class="iconfont icon-upload"></i>
        <span>Please drag and drop PSD here</span>
    </div>
</template>

<script lang="ts">
// import storage from '@/core/storage'
// import { STORAGE_KEY_PSD_DATA } from '@/core/constants'
import PSD from "@n.see/psd-parser";
import { useStore } from "vuex";
const store = useStore();
export default {
    data() {
        return {
            msg: "hello vue",
        };
    },
    mounted() {
        // let vm = this
        this.$el.addEventListener("dragover", this.onDragOver, true);
        this.$el.addEventListener("drop", this.onDrop, true);
        // let data = storage.getItem(STORAGE_KEY_PSD_DATA)
        // if (data) {
        // this.$store.dispatch('parsePsd', data)
        // }
    },
    methods: {
        onDragOver(event) {
            event.stopPropagation();
            event.preventDefault();
            event.dataTransfer.dropEffect = "copy";
        },
        onDrop(e) {
            e.stopPropagation();
            e.preventDefault();
            // eslint-disable-next-line
            PSD.fromEvent(e).then((psd) => {
                store.dispatch("parsePsd", psd);
                // storage.setItem(STORAGE_KEY_PSD_DATA, data)
                console.log("parsePsd success!");
            });
        },
    },
};
</script>
