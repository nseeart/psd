/**
 * Updated by n.see on 2022/12/06.
 */
import { array2hex, array2rgba, unique } from "@/core/utils";

export interface PSDDocument {
    width: number;
    height: number;
    resources: Record<string, any>;
}

export interface PSDNode {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
}

export interface PSDFont {
    color: number[];
    family: string[];
    lineHeight: number;
    size: number;
    style: string;
    textAlign: string;
    textDecoration: string;
    weight: string;
}

export interface PSDText {
    bottom: number;
    font: Record<string, any>;
    left: number;
    right: number;
    top: number;
    transform: Record<string, any>;
    value: string;
    cssFont: PSDFont;
}

export interface PSDGroup extends PSDNode {
    blendingMode: string;
    children: Array<PSDGroup | PSDLayer>;
    name: string;
    opacity: number;
    type: "group";
    visible: boolean;
    isGroup: () => boolean;
    hidden: () => boolean;
    export: () => Record<string, any>;
    toPng: () => string;
}

export interface PSDMask extends PSDNode {
    defaultColor: number;
    disabled: boolean;
    invert: boolean;
    relative: boolean;
}

export interface PSDLayer extends PSDNode {
    id: number;
    blendingMode: string;
    image: Record<string, any>;
    mask: PSDMask;
    name: string;
    opacity: number;
    text?: PSDText;
    type: "layer";
    visible: boolean;
    isGroup: () => boolean;
    hidden: () => boolean;
    export: () => Record<string, any>;
    toPng: () => string;
}
export type PSDChildren = Array<PSDGroup | PSDLayer>;

export default class PsdParse {
    psdTree: any;
    treeExport: {
        children: PSDChildren;
        document: PSDDocument;
    };
    children: PSDChildren;
    document: PSDDocument;
    descendants: any[];
    layers: any[];
    constructor(psdTree: any) {
        this.psdTree = psdTree;
        this.treeExport = this.psdTree.export();
        this.children = this.treeExport.children;
        this.document = this.treeExport.document;
        this.descendants = this.psdTree.descendants();
        this.layers = [];
    }
    parse() {
        this.parseDescendants(this.descendants);
        this.overflows();
        // this.parseLayers(this.descendants);
        return this;
    }

    /**
     * 获取扁平图层
     * @returns {Array}
     */
    getLayers() {
        return this.layers;
    }

    /**
     * 遍历修正溢出层
     */
    overflows() {
        this.layers.map((layer) => {
            return this.overflow(layer);
        });
    }

    /**
     * 修正溢出的层
     * @param layer
     * @returns {*}
     */
    overflow(layer: PSDLayer) {
        let { top, right, bottom, left, width, height } = Object.assign(
            {},
            layer
        );
        const docWidth = this.document.width;
        const docHeight = this.document.height;
        top = top > 0 ? top : 0;
        left = left > 0 ? left : 0;
        width = width > docWidth - left ? docWidth - left : width;
        height = height > docHeight - top ? docHeight - top : height;
        return Object.assign(layer, {
            top,
            left,
            right,
            bottom,
            width,
            height,
        });
    }
    parseLayers(descendants: any[]) {
        descendants.forEach((node, index) => {
            if (index < 10) {
                var nodeInfo = node.export();
                // console.log(nodeInfo);
                // console.log('node:', node)
            }
        });
        // console.log('descendants====xxx:', descendants)
    }
    /**
     * 图层扁平化
     * 修正偏移
     * @param children
     */
    parseDescendants(descendants: PSDChildren) {
        if (descendants.length === 0) {
            return;
        }
        descendants.forEach((node, index) => {
            if (node.isGroup() || node.hidden()) {
                return true;
            }
            const item = node.export();
            if (item.width <= 0 || item.height <= 0) {
                // 无效数据
                return;
            }

            if (item.type === "layer" && item.visible) {
                const {
                    // id: index,
                    layerType,
                    name,
                    left,
                    top,
                    right,
                    bottom,
                    width,
                    height,
                } = item;
                const layer = {
                    id: index,
                    layerType,
                    name,
                    left,
                    top,
                    right,
                    bottom,
                    width,
                    height,
                    zIndex: -(width * height),
                };
                if (layerType === "text") {
                    Object.assign(layer, {
                        text: this.parseText(item.text),
                        font: this.parseFont(item.text.cssFont),
                    });
                } else {
                    item.vector &&
                        Object.assign(layer, {
                            vector: item.vector,
                        });

                    item.mask &&
                        Object.assign(layer, {
                            mask: item.mask,
                        });
                }
                this.layers.push(layer);
            }
        });
    }

    _base64ToArrayBuffer(base64: string) {
        const binaryString = window.btoa(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    parseText(text: PSDText) {
        const { value, top, right, bottom, left } = text;
        return {
            value,
            top,
            right,
            bottom,
            left,
        };
    }

    /**
     * 处理文字属性
     * @param font
     * @returns {{aligns: *, colors: *, lineHeights: *, lengthArray: *, names: *, sizes: *, styles: *, textDecoration: *, weights: *}}
     */
    parseFont(font: PSDFont) {
        return {
            ...font,
            color: this.parseColor(font.color),
            family: this.parseFamily(font.family),
        };
    }

    parseColor(color: number[]) {
        return {
            rgba: array2rgba(color),
            hex: array2hex(color),
        };
    }

    parseFamily(family: string[]) {
        return family.join(", ");
    }
}
