import Node from "../node";
import { merge } from "lodash-es";
import { signed } from "../util";

export default class Layer extends Node {
    constructor() {
        return super(...arguments);
    }

    type = "layer";

    isEmpty() {
        return this.width === 0 || this.height === 0;
    }

    isVector() {
        return !!this.get("vectorMask");
    }

    getIsVectorRect(layerInfo) {
        if (this.isVector()) {
            return {
                ...layerInfo,
                top: layerInfo.top + 1,
                left: layerInfo.left + 1,
                right: layerInfo.right - 1,
                bottom: layerInfo.bottom - 1,
                width: layerInfo.right - layerInfo.left - 2,
                height: layerInfo.bottom - layerInfo.top - 2,
            };
        }
        return layerInfo;
    }

    getPathPosition(pathNode = {}) {
        const { vert, horiz } = pathNode;
        return {
            x: signed(horiz),
            y: signed(vert),
        };
    }

    parsePath(path, { width, height }) {
        const { preceding, anchor, leaving } = path;
        const precedingPos = this.getPathPosition(preceding);
        const anchorPos = this.getPathPosition(anchor);
        const leavingPos = this.getPathPosition(leaving);
        // relX 和 relY 保留了PSD中原始数据。
        return {
            preceding: {
                relX: precedingPos.x,
                relY: precedingPos.y,
                x: Math.round(width * precedingPos.x),
                y: Math.round(height * precedingPos.y),
            },
            anchor: {
                relX: anchorPos.x,
                relY: anchorPos.y,
                x: Math.round(width * anchorPos.x),
                y: Math.round(height * anchorPos.y),
            },
            leaving: {
                relX: leavingPos.x,
                relY: leavingPos.y,
                x: Math.round(width * leavingPos.x),
                y: Math.round(height * leavingPos.y),
            },
        };
    }

    toPathD(paths) {
        let head;
        const data = [];

        paths.forEach((path, index) => {
            const { preceding, anchor, leaving } = path;

            if (index < paths.length - 1) {
                if (index > 0) {
                    // 中间节点
                    data.push(
                        `${preceding.x}, ${preceding.y} ${anchor.x}, ${anchor.y} ${leaving.x}, ${leaving.y}`
                    );
                } else {
                    // 记录第一个节点，用于在关闭路径的时候使用
                    head = path;
                    data.push(
                        `M ${anchor.x}, ${anchor.y} C${leaving.x}, ${leaving.y}`
                    );
                }
            } else {
                data.push(
                    `${preceding.x}, ${preceding.y} ${anchor.x}, ${anchor.y} ${leaving.x}, ${leaving.y} ${head.preceding.x}, ${head.preceding.y} ${head.anchor.x}, ${head.anchor.y} Z`
                );
            }
        });
        return data.join(" ");
        // return `<path d="${data.join(' ')}" fill="${fill}" />`;
    }

    getVectorStroke() {
        const vectorStroke = this.get("vectorStroke");
        if (!vectorStroke) {
            return undefined;
        }
        return vectorStroke.data;
    }

    getVectorStrokeContent() {
        const vectorStrokeContent = this.get("vectorStrokeContent");
        if (!vectorStrokeContent) {
            return undefined;
        }
        return vectorStrokeContent.color();
    }

    getSolidColor() {
        const solidColor = this.get("solidColor");
        if (!solidColor) {
            return undefined;
        }
        return solidColor.color();
    }

    getVectorOrigination() {
        const vectorOrigination = this.get("vectorOrigination");
        if (!vectorOrigination) {
            return [];
        }
        return vectorOrigination.data;
    }

    /**
     * https://www.adobe.com/devnet-apps/photoshop/fileformatashtml/#50577409_13084
     * 0 - 闭合子路径长度记录
     * 1 - 闭合子路径贝塞尔结，链接
     * 2 - 闭合子路径贝塞尔结，未链接
     * 3 - 打开子路径长度记录
     * 4 - 打开子路径贝塞尔结，链接
     * 5 - 打开子路径贝塞尔结，未链接
     * 6 - 路径填充规则记录
     * 7 - 剪贴板记录
     * 8 - 初始填充规则记录
     */
    getVectorMask() {
        const vectorMask = this.get("vectorMask");
        if (!vectorMask) {
            return undefined;
        }
        const vectorMaskData = vectorMask.export();
        const { width, height } = this.root();
        const data = {};
        const convertedPath = [];
        vectorMaskData.paths.forEach((path) => {
            const { recordType, numPoints, initialFill } = path;
            const { preceding, anchor, leaving } = this.parsePath(path, {
                width,
                height,
            });
            // 点数量
            if ([0, 3].includes(recordType)) {
                data["numPoints"] = numPoints;
            }
            if ([1, 4].includes(recordType)) {
                convertedPath.push({
                    preceding,
                    anchor,
                    leaving,
                });
            }
            if ([2, 5].includes(recordType)) {
                convertedPath.push({
                    anchor,
                    preceding: anchor,
                    leaving: anchor,
                });
            }
            if (recordType === 8) {
                data["initialFill"] = initialFill;
            }
        });
        return {
            ...data,
            d: this.toPathD(convertedPath),
            paths: convertedPath,
        };
    }

    getText() {
        const _ref = this.get("typeTool");
        const text = _ref && _ref.export ? _ref.export() : void 0;
        return text;
    }

    parseVectorBorderStyle(strokeStyleLineDashSet) {
        if (strokeStyleLineDashSet.length === 0) {
            return "solid";
        } else if (strokeStyleLineDashSet.length === 2) {
            const [a, b] = strokeStyleLineDashSet;
            if (a.value === 0 && b.value === 2) {
                return "dotted";
            } else if (a.value === 2 && b.value === 4) {
                return "dashed";
            }
            return "solid";
        }
        return "solid";
    }
    parseVectorBorderColor(strokeStyleContent) {
        const colorData = strokeStyleContent["Clr "];
        let color = [0, 0, 0];
        for (let i in colorData) {
            if (i.indexOf("Rd") > -1) {
                color[0] = colorData[i];
            } else if (i.indexOf("Grn") > -1) {
                color[1] = colorData[i];
            } else if (i.indexOf("Bl") > -1) {
                color[2] = colorData[i];
            }
        }
        return color;
    }
    parseVectorBorder(vectorStroke) {
        if (!vectorStroke) {
            return undefined;
        }
        return {
            width: vectorStroke.strokeStyleLineWidth.value,
            style: this.parseVectorBorderStyle(
                vectorStroke.strokeStyleLineDashSet
            ),
            color: this.parseVectorBorderColor(vectorStroke.strokeStyleContent),
            opacity: vectorStroke.strokeStyleOpacity.value,
        };
    }

    export() {
        const layerInfo = this.getIsVectorRect(super.export());
        const vectorStroke = this.getVectorStroke();
        return merge(layerInfo, {
            type: "layer",
            mask: this.layer.mask.export(),
            text: this.getText(),
            image: {},
            solidColor: this.getSolidColor(),
            vectorMask: this.getVectorMask(),
            vectorStroke,
            vectorStrokeContent: this.getVectorStrokeContent(),
            vectorOrigination: this.getVectorOrigination(),
            vector: {
                border: this.parseVectorBorder(vectorStroke),
            },
        });
    }
}
