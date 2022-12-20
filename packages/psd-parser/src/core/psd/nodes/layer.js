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
            ...path,
            preceding: {
                // relX: precedingPos.x,
                // relY: precedingPos.y,
                x: Math.round(width * precedingPos.x) - this.left - 1,
                y: Math.round(height * precedingPos.y) - this.top - 1,
                // x: Math.round(width * precedingPos.x),
                // y: Math.round(height * precedingPos.y),
            },
            anchor: {
                // relX: anchorPos.x,
                // relY: anchorPos.y,
                x: Math.round(width * anchorPos.x) - this.left - 1,
                y: Math.round(height * anchorPos.y) - this.top - 1,
                // x: Math.round(width * anchorPos.x),
                // y: Math.round(height * anchorPos.y),
            },
            leaving: {
                // relX: leavingPos.x,
                // relY: leavingPos.y,
                x: Math.round(width * leavingPos.x) - this.left - 1,
                y: Math.round(height * leavingPos.y) - this.top - 1,
                // x: Math.round(width * leavingPos.x),
                // y: Math.round(height * leavingPos.y),
            },
        };
    }

    toPathPoint(paths = [], { closed, numPoints }) {
        const data = [];
        paths.forEach((path) => {
            if (!path.linked && closed) {
                data.push({
                    x: path.anchor.x,
                    y: path.anchor.y,
                });
            }
        });
        return data;
    }

    toPathD(paths = []) {
        let head;
        const data = [];
        paths.forEach((path, index) => {
            const { preceding, anchor, leaving, linked, closed } = path;
            if (index < paths.length - 1) {
                if (index > 0) {
                    // 中间节点
                    data.push(
                        `${preceding.x} ${preceding.y} ${anchor.x} ${anchor.y} ${leaving.x} ${leaving.y}`
                    );
                } else {
                    // 记录第一个节点，用于在关闭路径的时候使用
                    head = path;
                    data.push(
                        `M${anchor.x} ${anchor.y} C${leaving.x} ${leaving.y}`
                    );
                }
            } else {
                if (closed) {
                    data.push(
                        `${preceding.x} ${preceding.y} ${anchor.x} ${anchor.y} ${leaving.x} ${leaving.y} ${head.preceding.x} ${head.preceding.y} ${head.anchor.x} ${head.anchor.y} Z`
                    );
                } else {
                    data.push(
                        `${preceding.x} ${preceding.y} ${anchor.x} ${anchor.y}`
                    );
                }
            }
        });
        // return `<path d="${data.join(' ')}" fill="${fill}" />`;
        return data.join(" ");
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

    getPathData(paths, { width, height }) {
        paths = paths.map((path) =>
            this.parsePath(path, {
                width,
                height,
            })
        );
        const isPathGroup = this.isPathGroup(paths);
        const _group = [];
        let _initialFill = undefined;
        let _numPoints = 0;
        let _paths = [];
        let i = 0;
        paths.forEach((path, index) => {
            if (path.recordType === 8) {
                _initialFill = path.initialFill;
            }
            if (path.numPoints && path.numPoints > 0) {
                _numPoints = path.numPoints || "";
                const current = paths.splice(index + 1, path.numPoints);
                if (isPathGroup) {
                    if (!_group[i]) {
                        _group[i] = {
                            paths: [],
                            numPoints: _numPoints,
                        };
                    }
                    _group[i].paths.push(...current);
                    _numPoints = 0;
                    if (_numPoints === 0) {
                        i++;
                    }
                } else {
                    _paths = current;
                }
            }
        });

        return {
            initialFill: _initialFill,
            group: _group,
            paths: _paths,
            isPathGroup,
            numPoints: _numPoints,
        };
    }

    isPathGroup(paths) {
        const p = paths.filter((path) => path.numPoints > 0);
        return p.length > 1;
    }

    convertPaths(paths) {
        const _paths = [];
        paths.forEach((path) => {
            const {
                preceding,
                anchor,
                leaving,
                recordType,
                numPoints,
                initialFill,
                linked,
                closed,
            } = path;

            if ([1, 4].includes(recordType)) {
                _paths.push({
                    preceding,
                    anchor,
                    leaving,
                    linked,
                    closed,
                });
            }
            if ([2, 5].includes(recordType)) {
                _paths.push({
                    anchor,
                    preceding: anchor,
                    leaving: anchor,
                    linked,
                    closed,
                });
            }
        });
        return _paths;
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
        this.layerType = "path";
        const vectorMaskData = vectorMask.export();
        const { width, height } = this.root();
        const _vectorMaskData = this.getPathData(vectorMaskData.paths, {
            width,
            height,
        });
        const paths = this.convertPaths(_vectorMaskData.paths);
        const data = {
            ..._vectorMaskData,
            group: _vectorMaskData.group.map((item) => {
                const groupPaths = this.convertPaths(item.paths);
                return {
                    ...item,
                    paths: groupPaths,
                    d: this.toPathD(groupPaths),
                };
            }),
            paths,
            d: this.toPathD(paths),
        };

        // console.log("convertedPath", convertedPath);
        // 判断多边形
        // if (
        //     data.closed &&
        //     !data.linked &&
        //     (data.numPoints === 3 || data.numPoints > 4)
        // ) {
        //     this.layerType = "polygon";
        // }
        // if (!data.closed && data.numPoints > 1) {
        //     this.layerType = "path";
        // }
        // console.log("data", data);
        return data;
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

    // 线点
    parseVectorLinePoint(vectorOrigination) {
        if (!vectorOrigination) {
            return undefined;
        }

        const { keyOriginType, keyOriginLineEnd, keyOriginLineStart } =
            vectorOrigination.keyDescriptorList[0];
        if (keyOriginType !== 4) {
            return undefined;
        }
        return {
            start: {
                x: keyOriginLineStart.Hrzn - this.left - 1,
                y: keyOriginLineStart.Vrtc - this.top - 1,
            },
            end: {
                x: keyOriginLineEnd.Hrzn - this.left - 1,
                y: keyOriginLineEnd.Vrtc - this.top - 1,
            },
        };
    }

    // 圆角
    parseVectorRadius(vectorOrigination) {
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

    // svg 边框
    parseVectorStroke(vectorStroke, vectorOrigination) {
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
            return stroke;
        }
        if (vectorOrigination) {
            const { keyOriginLineWeight } =
                vectorOrigination.keyDescriptorList[0];
            return {
                width: keyOriginLineWeight,
            };
        }
        return undefined;
    }

    parsePolygonPoint(poits) {
        const _poits = [];
        poits.forEach((poit) => {
            _poits.push(`${poit.x},${poit.y}`);
        });
        return _poits.join(" ");
    }

    export() {
        const layerInfo = this.getLayerInfo(super.export());

        const solidColor = this.getSolidColor();
        // solidColor && Object.assign(layerInfo, { solidColor });
        // vectorMask
        const vectorMask = this.getVectorMask();
        // vectorMask && Object.assign(layerInfo, { vectorMask });
        // text
        const text = this.getText();
        text && Object.assign(layerInfo, { text });
        // mask
        const mask = this.layer.mask.export();
        mask && Object.assign(layerInfo, { mask });

        const vectorStroke = this.getVectorStroke();
        // vectorStroke && Object.assign(layerInfo, { vectorStroke });

        const vectorOrigination = this.getVectorOrigination();
        // vectorOrigination && Object.assign(layerInfo, { vectorOrigination });

        const vectorStrokeContent = this.getVectorStrokeContent();
        // vectorStrokeContent &&
        //     Object.assign(layerInfo, { vectorStrokeContent });

        // vector data;
        const vector = {};
        const stroke = this.parseVectorStroke(vectorStroke, vectorOrigination);
        stroke && Object.assign(vector, { stroke });
        (solidColor || vectorStrokeContent) &&
            Object.assign(vector, {
                fill: solidColor ? solidColor : vectorStrokeContent,
            });
        vectorMask && Object.assign(vector, vectorMask);

        // polygon poit
        vectorMask &&
            vectorMask.points &&
            Object.assign(vector, {
                polygonPoint: this.parsePolygonPoint(vectorMask.points),
            });

        if (vectorOrigination) {
            const linePoint = this.parseVectorLinePoint(vectorOrigination);
            linePoint &&
                Object.assign(vector, {
                    linePoint,
                });
        }

        if (vectorOrigination) {
            const radius = this.parseVectorRadius(vectorOrigination);
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
