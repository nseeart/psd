<template>
    <div class="drop-box" ref="dropBoxRef">
        <el-icon :size="30" color="#aaa"><UploadFilled /></el-icon>
        <span>Please drag and drop PSD here</span>
    </div>
</template>

<script lang="ts" setup>
// import storage from '@/core/storage'
// import { STORAGE_KEY_PSD_DATA } from '@/core/constants'
import PSD from "@n.see/psd-parser";

// import PSD from "psd.js";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import { ElIcon } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";

const store = useStore();
const dropBoxRef = ref();

const onDragOver = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
};

const onDrop = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    PSD.fromEvent(e).then((psd: PSD) => {
        store.dispatch("parsePsd", psd);
        // storage.setItem(STORAGE_KEY_PSD_DATA, data)
        console.log("parsePsd success!", psd);
    });
};

onMounted(() => {
    dropBoxRef.value.addEventListener("dragover", onDragOver, true);
    dropBoxRef.value.addEventListener("drop", onDrop, true);
    PSD.fromURL("/test2.psd").then((psd: any) => {
        const tree = psd.tree();
        store.dispatch("parsePsd", psd);
        console.log("tree", tree.export());
        console.log("parsePsd success!");
    });
});
</script>

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
    margin-top: px2rem(-180);
    margin-left: px2rem(-321);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: px2rem(8);

    span {
        display: block;
        font-size: px2rem(30);
        color: #999;
        margin-top: 20px;
    }
}
</style>
