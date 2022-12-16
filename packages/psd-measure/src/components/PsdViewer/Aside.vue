<template>
    <div class="auto viewer-aside" ref="viewerAsideRef">
        <transition name="bounce">
            <div class="viewer-toast" v-show="isToastShow">
                copied to clipboard!
            </div>
        </transition>
        <div
            class="viewer-aside-container"
            :class="{ 'select-layer': isSelectLayer }"
        >
            <div class="viewer-aside-document">
                <div class="viewer-aside-document-scroll">
                    <div class="viewer-aside-title" v-if="psdDocument.updateAt">
                        <h5>最后更新时间</h5>
                    </div>
                    <div
                        class="viewer-aside-content"
                        v-if="psdDocument.updateAt"
                    >
                        <p>{{ psdDocument.updateAt }}</p>
                    </div>
                    <div
                        class="viewer-aside-title"
                        v-if="psdDocument.width && psdDocument.height"
                    >
                        <h5>文件信息</h5>
                    </div>
                    <div
                        class="viewer-aside-content"
                        v-if="psdDocument.width && psdDocument.height"
                    >
                        <dl>
                            <dt>文件尺寸:</dt>
                            <dd>
                                <span>W: {{ psdDocument.width }}px</span>
                                <span>H: {{ psdDocument.height }}px</span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>文件大小:</dt>
                            <dd>{{ psdDocument.size }} MB</dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div class="viewer-aside-layer">
                <div class="viewer-aside-layer-scroll">
                    <div class="viewer-aside-title">
                        <span class="btn-close" @click="handleClose">
                            <i class="iconfont icon-close"></i>
                        </span>
                        <h5>
                            [{{ layerItem.layerType }}] {{ layerItem.name }}
                        </h5>
                    </div>
                    <div class="viewer-aside-content">
                        <div class="attr-line" data-label="X:">
                            {{ layerItem.left }}px
                        </div>
                        <div class="attr-line" data-label="Y:">
                            {{ layerItem.top }}px
                        </div>
                        <div class="attr-line" data-label="Width:">
                            {{ layerItem.width }}px
                        </div>
                        <div class="attr-line" data-label="Height:">
                            {{ layerItem.height }}px
                        </div>
                    </div>
                    <div class="viewer-aside-title" v-if="font">
                        <h5>Typeface</h5>
                    </div>
                    <div class="viewer-aside-content" v-if="font">
                        <div
                            v-if="font.family"
                            class="attr-line"
                            data-label="Family:"
                        >
                            {{ font.family }}
                        </div>
                        <div
                            v-if="font.lineHeight"
                            class="attr-line"
                            data-label="LineHeight:"
                        >
                            {{ font.lineHeight }}
                        </div>
                        <div
                            v-if="font.size"
                            class="attr-line"
                            data-label="Size:"
                        >
                            {{ font.size }}
                        </div>
                        <div
                            v-if="font.textAlign"
                            class="attr-line"
                            data-label="textAlign:"
                        >
                            {{ font.textAlign }}
                        </div>
                        <div
                            v-if="font.style"
                            class="attr-line"
                            data-label="Style:"
                        >
                            {{ font.style }}
                        </div>
                        <div
                            v-if="font.weight"
                            class="attr-line"
                            data-label="Weight:"
                        >
                            {{ font.weight }}
                        </div>
                        <div
                            v-if="font.color"
                            class="attr-line"
                            data-label="Color:"
                        >
                            <ul class="colors">
                                <li>
                                    <i
                                        class="color"
                                        :style="{
                                            backgroundColor: font.color.rgba,
                                        }"
                                    ></i>
                                    <span>{{ font.color.hex.strHex }}</span>
                                    <span style="margin-left: 8px"
                                        >{{
                                            font.color.hex.opacity * 100
                                        }}%</span
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                    <template v-if="layerItem.vector">
                        <div class="viewer-aside-title">
                            <h5>Svg</h5>
                        </div>
                        <div
                            class="viewer-aside-content viewer-aside-content-bg"
                        >
                            <div class="image-inner">
                                <svg
                                    :width="layerItem.width"
                                    :height="layerItem.height"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        :d="layerItem.vector.d"
                                        fill="red"
                                    ></path>
                                    <!-- <rect
                                        x="20"
                                        y="20"
                                        rx="20"
                                        ry="20"
                                        width="250"
                                        height="100"
                                        style="
                                            fill: red;
                                            stroke: black;
                                            stroke-width: 5;
                                            opacity: 0.5;
                                        "
                                    /> -->
                                </svg>
                            </div>
                        </div>
                    </template>
                    <template v-if="layerItem.image">
                        <div class="viewer-aside-title">
                            <h5>Image</h5>
                        </div>
                        <div
                            class="viewer-aside-content viewer-aside-content-bg"
                        >
                            <div class="image-inner">
                                <img :src="layerItem.image.src" />
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="viewer-aside-title">
                            <h5>BackgroundColor</h5>
                        </div>
                        <div class="viewer-aside-content">
                            <div class="bgcolor-inner">
                                <ul class="colors">
                                    <li>
                                        <i
                                            class="color"
                                            :style="{
                                                backgroundColor:
                                                    layerItem.bgColor,
                                                border:
                                                    layerItem.bgColor ===
                                                    '#ffffff'
                                                        ? `1px solid #ccc`
                                                        : 'none',
                                            }"
                                        ></i>
                                        <span>{{ layerItem.bgColor }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="viewer-aside-title" v-if="border">
                            <h5>Border</h5>
                        </div>
                        <div class="viewer-aside-content" v-if="border">
                            <div
                                v-if="border.size"
                                class="attr-line"
                                data-label="Size:"
                            >
                                {{ border.size }}px
                            </div>
                            <div
                                v-if="border.style"
                                class="attr-line"
                                data-label="Style:"
                            >
                                {{ border.style }}
                            </div>
                            <div
                                v-if="border.color"
                                class="attr-line"
                                data-label="Color:"
                            >
                                <ul class="colors">
                                    <li>
                                        <i
                                            class="color"
                                            :style="{
                                                backgroundColor: border.color,
                                            }"
                                        ></i>
                                        <span>{{ border.color }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </template>
                    <div class="viewer-aside-title" v-if="layerItem.text">
                        <div
                            class="right btn-copy"
                            v-clipboard="layerItem.text.value"
                            v-clipboard:success="hanSuccess"
                        >
                            <el-icon><DocumentCopy /></el-icon>
                        </div>
                        <h5>Content</h5>
                    </div>
                    <div class="viewer-aside-content" v-if="layerItem.text">
                        <p>{{ layerItem.text && layerItem.text.value }}</p>
                    </div>
                    <div class="viewer-aside-title">
                        <div
                            class="right btn-copy"
                            v-clipboard="codeSource"
                            v-clipboard:success="hanSuccess"
                        >
                            <el-icon><DocumentCopy /></el-icon>
                        </div>
                        <h5 class="auto">CSS</h5>
                    </div>
                    <div class="viewer-aside-content">
                        <aside-css :codeData="codeData" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import AsideCss from "./AsideCss.vue";
import { hash } from "@/core/utils";
import { computed, ref, watch } from "vue";
import { DocumentCopy } from "@element-plus/icons-vue";
import { ElIcon, ElMessage } from "element-plus";

const hanSuccess = () => {
    ElMessage({
        message: "复制成功！",
        type: "success",
    });
};
const store = useStore();
const isSetDetailWidth = ref(false);
const viewerAsideRef = ref();
const docmentSize = computed(() => store.state.psdPng.src.length / 1024);
const border = computed(() =>
    store.state.layerItem.border ? store.state.layerItem.border : null
);
const font = computed(() => {
    return store.state.layerItem.font ? store.state.layerItem.font : null;
});

const layerType = computed(() => {
    return store.state.layerItem.layerType;
});

const codeData = computed(() => {
    let classNameHash = getClassName(store.state.layerItem.name);
    let base = [
        {
            keyValue: "width",
            keyType: "hl-key",
            valueValue: store.state.layerItem.width + "px",
            valueType: "hl-value-number",
        },
        {
            keyValue: "height",
            keyType: "hl-key",
            valueValue: store.state.layerItem.height + "px",
            valueType: "hl-value-number",
        },
    ];
    if (store.state.layerItem.bgColor) {
        base.push({
            keyValue: "background-color",
            keyType: "hl-key",
            valueValue: store.state.layerItem.bgColor,
            valueType: "hl-value-string",
        });
    }
    if (store.state.layerItem.border) {
        base.push({
            keyValue: "border",
            keyType: "hl-key",
            valueValue: `${store.state.layerItem.border.size}px solid ${store.state.layerItem.border.color}`,
            valueType: "hl-value-string",
        });
    }
    return {
        className: {
            value: classNameHash,
            type: "hl-class-name",
        },
        attributes: {
            base,
            font: font.value
                ? [
                      {
                          keyValue: "line-height",
                          keyType: "hl-key",
                          valueValue:
                              font.value && font.value.lineHeight + "px",
                          valueType: "hl-value-number",
                      },
                      {
                          keyValue: "font-size",
                          keyType: "hl-key",
                          valueValue: font.value && font.value.size + "px",
                          valueType: "hl-value-number",
                      },
                      {
                          keyValue: "font-weight",
                          keyType: "hl-key",
                          valueValue: font.value && font.value.weight,
                          valueType: "hl-value-number",
                      },
                      {
                          keyValue: "text-align",
                          keyType: "hl-key",
                          valueValue: font.value && font.value.textAlign,
                          valueType: "hl-value-number",
                      },
                      {
                          keyValue: "color",
                          keyType: "hl-key",
                          valueValue: font.value && font.value.color.rgba,
                          valueType: "hl-value-number",
                      },
                      {
                          keyValue: "font-family",
                          keyType: "hl-key",
                          valueValue: font.value && font.value.family,
                          valueType: "hl-value-number",
                      },
                  ]
                : null,
        },
    };
});
const codeSource = computed(() => {
    const className = codeData.value.className.value;
    const base = codeData.value.attributes.base;
    const font = codeData.value.attributes.font;
    let contentArr: any[] = [];

    base.forEach((item, index) => {
        contentArr.push(`${item.keyValue}:${item.valueValue};`);
    });
    font &&
        font.forEach((item, index) => {
            contentArr.push(`${item.keyValue}:${item.valueValue};`);
        });

    return `.${className}{
            ${contentArr.join("\n")}
      }`;
});
const asideWidth = computed(() => store.getters["getAsideWidth"]);
const asideDefaultWidth = computed(() => store.getters["getAsideDefaultWidth"]);
const psdDocument = computed(() => store.getters["getPsdDocument"]);
const psdPng = computed(() => store.getters["getPsdPng"]);
const isSelectLayer = computed(() => store.getters["getSelectLayerStatus"]);
const layerItem = computed(() => store.getters["getLayerItem"]);
const isToastShow = computed(() => store.getters["getToastStatus"]);

watch(asideWidth, (newVal: number, oldVal: number) => {
    if (newVal > 0 && !isSetDetailWidth.value) {
        isSetDetailWidth.value = true;
        setDefaultWdith(newVal);
    }
    updateWidth(newVal);
});

function getClassName(name: string) {
    return name ? hash(name) : null;
}
const handleClose = () => {
    store.dispatch("handleCancelLayer");
};
function updateWidth(asideWidth: number) {
    if (asideWidth <= asideDefaultWidth.value) {
        let transition = `
                    transition: width .3s;
                    -o-transition: width .3s;
                    -ms-transition: width .3s;
                    -moz-transition: width .3s;
                    -webkit-transition: width .3s;
                `;
        viewerAsideRef.value.setAttribute(
            "style",
            `width: ${asideWidth}px; ${transition}`
        );
    } else {
        viewerAsideRef.value.setAttribute("style", `width: ${asideWidth}px;`);
    }
}
function setDefaultWdith(asideWidth: number) {
    store.dispatch("setAsideDefaultWidth", asideWidth);
}
</script>
<style lang="scss" scoped>
@import "base";
.viewer-aside {
    width: px2rem(520);
    // width: 0;
    background-color: #ffffff;
    height: 100%;
    position: relative;
}
.viewer-aside-container {
    width: 200%;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    transition: left 0.3s;
    &.select-layer {
        left: -100%;
    }
}
.viewer-aside-document,
.viewer-aside-layer {
    width: 50%;
    height: 100%;
    float: left;
    overflow-y: scroll;
}
.viewer-aside-document-scroll,
.viewer-aside-layer-scroll {
    height: auto;
}
.viewer-aside-title {
    height: px2rem(64);
    line-height: px2rem(64);
    background-color: #f9f9f9;
    padding: 0 px2rem(10) 0 px2rem(32);
    h5 {
        font-size: px2rem(28);
        color: #999999;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .btn-close,
    .btn-copy {
        display: flex;
        width: px2rem(64);
        height: px2rem(64);
        align-items: center;
        justify-content: center;
        float: right;
        cursor: pointer;
        color: #aaa;
        &:hover {
            color: #666;
        }
    }
}
.viewer-aside-content {
    padding: px2rem(16) 0;
    font-size: px2rem(28);
    line-height: 2;
    p {
        padding: 0 px2rem(32);
        color: #333;
        line-height: 1.5;
    }
    dl {
        padding: 0 px2rem(32);
        &:after {
            display: block;
            content: "";
            width: 100%;
            height: 0;
            clear: both;
        }
    }
    dt {
        color: #999999;
        float: left;
        margin-right: px2rem(16);
    }
    dd {
        color: #333333;
        overflow: hidden;
        span {
            display: block;
        }
        > ul {
            padding-left: 0;
            padding-right: 0;
            line-height: 2;
        }
    }
    ul {
        padding: px2rem(10) px2rem(32);
    }
    li {
        line-height: 1.25;
        i,
        span {
            display: inline-block;
            vertical-align: middle;
        }
        i {
            width: px2rem(36);
            height: px2rem(36);
        }
    }
    .attr-line {
        line-height: 1.75;
        color: #333333;
        padding: 0 px2rem(32);
        &:before {
            content: attr(data-label);
            margin-right: px2rem(10);
            color: #999;
        }
    }
    .colors {
        padding-left: 0;
        li {
            padding: px2rem(10) 0;
            // i.color {
            //     border: 1px solid #eee;
            // }
        }
    }
    .image-inner {
        width: 100%;
        padding: 0 1rem;
        img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;
        }
    }
    .bgcolor-inner {
        padding: 0 1rem;
    }
}

.viewer-aside-content-bg {
    min-width: 100%;
    min-height: 100%;
    background-image: url(~/assets/images/dot_bg.png);
    background-position: top left;
    background-size: 0.5rem 0.5rem;
    overflow: hidden;
}
.viewer-toast {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 0, 255, 0.9);
    z-index: 10;
    color: #fff;
    font-size: px2rem(14);
    padding: px2rem(10) px2rem(32);
    border-radius: px2rem(48);
    white-space: nowrap;
}
.bounce-enter-active {
    animation: bounce-in 0.5s;
}
.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
