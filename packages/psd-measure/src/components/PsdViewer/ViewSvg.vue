<template>
    <div class="view-svg" ref="viewSvg">
        <!-- <svg
            width="100%"
            height="auto"
            :viewBox="`0 0 ${layerItem.width} ${layerItem.height}`"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                :d="layerItem.vector.d"
                :fill="`rgb(${layerItem.vector.fill})`"
                :stroke="`rgb(${layerItem.vector?.stroke?.color})`"
                :stroke-width="layerItem.vector?.stroke?.width"
                :stroke-style="layerItem.vector?.stroke?.style"
                :stroke-opacity="layerItem.vector?.stroke?.opacity / 100"
                stroke-linejoin="round"
                stroke-linecap="round"
            ></path>
        </svg> -->
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, onMounted, ref, watch } from "vue";
import { StrokeData, Svg, SVG, SvgType } from "@svgdotjs/svg.js";
import { array2rgb } from "@/core/utils";
import Color from "color";
const props = defineProps({
    layerItem: {
        type: Object,
    },
});
const viewSvg = ref();
let draw: any;

function renderStroke(context: Svg, stroke: StrokeData) {
    if (context && stroke && stroke.width && stroke.color) {
        context.stroke({
            color: Color.rgb(stroke.color).hex(),
            width: stroke.width,
        });
    }
}
function renderSvg(draw: any) {
    if (!props.layerItem || !props.layerItem.vector) {
        return undefined;
    }
    const {
        fill,
        group,
        isPathGroup,
        stroke,
        d,
        radius,
        polygonPoint,
        linePoint,
    } = props.layerItem.vector;
    const strokeWidth = (stroke && stroke.width) || 0;
    const fillHex = Color.rgb(fill).hex();
    // const draw = SVG();
    draw.clear();
    draw.size("100%", "100%");
    draw.viewbox(0, 0, props.layerItem.width, props.layerItem.height);

    if (props.layerItem.layerType === "rect") {
        const rect = draw.rect(
            props.layerItem.width - strokeWidth,
            props.layerItem.height - strokeWidth
        );
        rect.fill(fillHex).move(strokeWidth / 2, strokeWidth / 2);
        radius && rect.radius(radius - strokeWidth / 2);
        renderStroke(rect, stroke);
    } else if (props.layerItem.layerType === "circle") {
        const circle = draw
            .circle(props.layerItem.width - strokeWidth)
            .fill(fillHex)
            .move(strokeWidth / 2, strokeWidth / 2);
        renderStroke(circle, stroke);
    } else if (props.layerItem.layerType === "ellipse") {
        const ellipse = draw.ellipse(
            props.layerItem.width - strokeWidth,
            props.layerItem.height - strokeWidth
        );
        ellipse.fill(fillHex).move(strokeWidth / 2, strokeWidth / 2);
        renderStroke(ellipse, stroke);
    } else if (props.layerItem.layerType === "polygon") {
        const polygon = draw.polygon(polygonPoint);
        polygon.fill(fillHex);
    } else if (props.layerItem.layerType === "line") {
        const line = draw.line(
            linePoint.start.x,
            linePoint.start.y,
            linePoint.end.x,
            linePoint.end.y
        );
        line.stroke({ color: fillHex, width: strokeWidth });
    } else {
        draw.viewbox(
            0,
            0,
            props.layerItem.width + strokeWidth * 2,
            props.layerItem.height + strokeWidth * 2
        );
        console.log("group", isPathGroup, group);
        if (isPathGroup) {
            const g = draw.group();
            group.forEach((item: any) => {
                const path = g.path(item.d);
                path.fill(fillHex);
                renderStroke(path, stroke);
            });
        } else {
            const path = draw.path(d);
            path.fill(fillHex).move(strokeWidth, strokeWidth);
            renderStroke(path, stroke);
        }
    }
}
onMounted(() => {
    draw = SVG();
    draw.addTo(viewSvg.value);
    renderSvg(draw);
});

watch(
    () => props.layerItem,
    () => {
        viewSvg.value && draw && renderSvg(draw);
    }
);
</script>

<style lang="scss" scoped>
@import "base";
.view-svg {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
