import Node from "../node";
import { signed } from "../util";

export default class Layer extends Node {
    constructor() {
        return super(...arguments);
    }

    type = "layer";
    layerType = "image";

    isEmpty() {
        return this.width === 0 || this.height === 0;
    }

    isVector() {
        return !!this.get("vectorMask");
    }

    getLayerInfo(layerInfo) {
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
            return undefined;
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
            const { recordType, numPoints, initialFill, linked, closed } = path;
            data["linked"] = linked;
            data["closed"] = closed;
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
        // 判断多边形
        if (
            data.closed &&
            !data.linked &&
            (data.numPoints === 3 || data.numPoints > 4)
        ) {
            this.layerType = "polygon";
        }
        if (!data.closed && data.numPoints > 1) {
            this.layerType = "path";
        }
        return {
            ...data,
            d: this.toPathD(convertedPath),
            paths: convertedPath,
        };
    }

    getText() {
        const _ref = this.get("typeTool");
        if (!_ref) {
            return undefined;
        }
        this.layerType = "text";
        return _ref.export();
    }

    parseVectorStrokeStyle(strokeStyleLineDashSet) {
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
    parseVectorStrokeColor(strokeStyleContent) {
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
    parseVectorStrokeRadius(vectorOrigination) {
        if (!vectorOrigination) {
            return undefined;
        }
        const { keyOriginType, keyOriginRRectRadii, keyOriginShapeBBox } =
            vectorOrigination.keyDescriptorList[0];
        // 线
        if (keyOriginType === 4) {
            this.layerType = "line";
        }

        // 圆与椭圆
        if (keyOriginType === 5) {
            const { Btom, Left, Rght } = keyOriginShapeBBox;
            const Top = keyOriginShapeBBox["Top "];
            if (Btom.value - Top.value === Rght.value - Left.value) {
                this.layerType = "circle";
            } else {
                this.layerType = "ellipse";
            }
            return "50%";
        }

        if ([1, 2].includes(keyOriginType)) {
            this.layerType = "rect";
        }
        // 矩形
        if (keyOriginType === 1) {
            return 0;
        }
        // 矩形-圆角
        if (keyOriginType === 2) {
            const { bottomLeft, bottomRight, topLeft, topRight } =
                keyOriginRRectRadii;
            const radius = [
                bottomLeft.value,
                bottomRight.value,
                topLeft.value,
                topRight.value,
            ];
            const radiusSet = new Set(radius);
            // 四角相等
            if (radiusSet.size === 1) {
                return bottomLeft.value;
            }
            return {
                bottomLeft: bottomLeft.value,
                bottomRight: bottomRight.value,
                topLeft: topLeft.value,
                topRight: topRight.value,
            };
        }
        return 0;
    }
    parseVectorStroke(vectorStroke, vectorOrigination) {
        // let radius = undefined;
        // if (vectorOrigination) {
        //     radius = this.parseVectorStrokeRadius(vectorOrigination);
        // }
        if (vectorStroke) {
            const stroke = {
                width: vectorStroke.strokeStyleLineWidth.value,
                style: this.parseVectorStrokeStyle(
                    vectorStroke.strokeStyleLineDashSet
                ),
                color: this.parseVectorStrokeColor(
                    vectorStroke.strokeStyleContent
                ),
                opacity: vectorStroke.strokeStyleOpacity.value,
            };
            // if (radius) {
            //     Object.assign(stroke, { radius });
            // }
            return stroke;
        }
        // if (radius) {
        //     return {
        //         radius: this.parseVectorStrokeRadius(vectorOrigination),
        //     };
        // }
        return undefined;
    }

    export() {
        const layerInfo = this.getLayerInfo(super.export());

        const vectorStroke = this.getVectorStroke();
        vectorStroke && Object.assign(layerInfo, { vectorStroke });

        const vectorOrigination = this.getVectorOrigination();
        vectorOrigination && Object.assign(layerInfo, { vectorOrigination });

        const vectorStrokeContent = this.getVectorStrokeContent();
        vectorStrokeContent &&
            Object.assign(layerInfo, { vectorStrokeContent });

        const solidColor = this.getSolidColor();
        solidColor && Object.assign(layerInfo, { solidColor });
        // vectorMask
        const vectorMask = this.getVectorMask();
        vectorMask && Object.assign(layerInfo, { vectorMask });
        // text
        const text = this.getText();
        text && Object.assign(layerInfo, { text });
        // mask
        const mask = this.layer.mask.export();
        mask && Object.assign(layerInfo, { mask });

        // vector data;
        const vector = {};
        const stroke = this.parseVectorStroke(vectorStroke, vectorOrigination);
        stroke && Object.assign(vector, { stroke });
        (solidColor || vectorStrokeContent) &&
            Object.assign(vector, {
                fill: solidColor ? solidColor : vectorStrokeContent,
            });
        vectorMask &&
            Object.assign(vector, {
                d: vectorMask.d,
            });

        if (vectorOrigination) {
            const radius = this.parseVectorStrokeRadius(vectorOrigination);
            radius && Object.assign(vector, { radius });
        }

        Object.keys(vector).length > 0 && Object.assign(layerInfo, { vector });

        return Object.assign(layerInfo, {
            type: "layer",
            layerType: this.layerType,
            image: {},
        });
    }
}
