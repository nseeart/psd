/**
 * Created by n.see on 2022/12/11
 */
import { PSDLayer } from "@/store/libs/psdParse";

export interface Line {
    top?: number;
    left?: number;
    width?: number;
    height?: number;
    isShow?: boolean;
}

class Distance {
    selectLayer: PSDLayer;
    nextLayer: PSDLayer;
    selectTop!: number;
    selectRight!: number;
    selectBottom!: number;
    selectLeft!: number;
    selectWidth!: number;
    selectHeight!: number;
    nextTop!: number;
    nextRight!: number;
    nextBottom!: number;
    nextLeft!: number;
    nextWidth!: number;
    nextHeight!: number;
    constructor(selectLayer: PSDLayer, nextLayer: PSDLayer) {
        this.selectLayer = selectLayer;
        this.nextLayer = nextLayer;
        this.initCoordinate();
    }
    initCoordinate() {
        this.selectTop = this.selectLayer.top;
        this.selectRight = this.selectLayer.right;
        this.selectBottom = this.selectLayer.bottom;
        this.selectLeft = this.selectLayer.left;
        this.selectWidth = this.selectLayer.width;
        this.selectHeight = this.selectLayer.height;
        this.nextTop = this.nextLayer.top;
        this.nextRight = this.nextLayer.right;
        this.nextBottom = this.nextLayer.bottom;
        this.nextLeft = this.nextLayer.left;
        this.nextWidth = this.nextLayer.width;
        this.nextHeight = this.nextLayer.height;
    }
    // 垂直
    vertical() {
        let lines: Line[] = [];
        let abs = Math.max(
            Math.abs(this.selectTop - this.nextBottom),
            Math.abs(this.nextTop - this.selectBottom)
        );
        let max = Math.max(this.selectHeight, this.nextHeight);
        let height2 = this.selectHeight + this.nextHeight;
        if (abs === height2) {
            // 外切
            // console.log('v:外切')
            lines = [
                {
                    top: this.nextTop,
                    height: Math.abs(this.nextBottom - this.nextTop),
                },
            ];
        } else if (abs > height2) {
            // 相离
            // console.log('v:相离')
            lines = [
                {
                    top:
                        this.selectBottom < this.nextTop
                            ? this.selectBottom
                            : this.nextBottom,
                    height:
                        this.selectBottom < this.nextTop
                            ? Math.abs(this.selectBottom - this.nextTop)
                            : Math.abs(this.selectTop - this.nextBottom),
                },
            ];
        } else {
            // console.log('v:内切')
            if (abs === max) {
                // 内切
                lines = [
                    {
                        top:
                            this.selectTop === this.nextTop
                                ? Math.min(this.selectBottom, this.nextBottom)
                                : Math.min(this.selectTop, this.nextTop),
                        height:
                            this.selectTop === this.nextTop
                                ? Math.abs(this.selectBottom - this.nextBottom)
                                : Math.abs(this.selectTop - this.nextTop),
                    },
                ];
            } else if (abs > max) {
                // 相交
                // console.log('v:相交')
                lines = [
                    {
                        top:
                            this.selectTop > this.nextTop
                                ? this.nextTop
                                : this.selectBottom,
                        height:
                            this.selectTop > this.nextTop
                                ? Math.abs(this.selectTop - this.nextTop)
                                : Math.abs(this.selectBottom - this.nextBottom),
                    },
                ];
            } else {
                // 包含
                // console.log('v:包含')
                lines = [
                    {
                        top:
                            this.selectTop > this.nextTop
                                ? this.nextTop
                                : this.selectTop,
                        height: Math.abs(this.nextTop - this.selectTop),
                    },
                    {
                        top:
                            this.selectTop > this.nextTop
                                ? this.selectBottom
                                : this.nextBottom,
                        height: Math.abs(this.nextBottom - this.selectBottom),
                    },
                ];
            }
        }
        lines.map((item) => {
            item["width"] = 1;
            item["isShow"] = true;
            item["left"] = this.nextLeft + this.nextWidth / 2;
            return item;
        });
        // console.log(lines)
        return lines;
    }

    // 水平
    horizontal() {
        let lines: Line[] = [];
        let absMax = Math.max(
            Math.abs(this.selectLeft - this.nextRight),
            Math.abs(this.selectRight - this.nextLeft)
        );
        let max = Math.max(this.selectWidth, this.nextWidth);
        let width2 = this.selectWidth + this.nextWidth;

        if (absMax === width2) {
            // 外切
            // console.log('h:外切')
            lines = [
                {
                    left: this.nextLeft,
                    width: this.nextWidth,
                },
            ];
        } else if (absMax > width2) {
            // 相离
            // console.log('h:相离')
            lines = [
                {
                    left:
                        this.nextLeft > this.selectLeft
                            ? this.selectRight
                            : this.nextRight,
                    width: absMax - width2,
                },
            ];
        } else {
            if (absMax === max) {
                // 内切
                // console.log('h:内切')
                lines = [
                    {
                        left:
                            this.selectLeft === this.nextLeft
                                ? Math.min(this.selectRight, this.nextRight)
                                : Math.max(this.selectLeft, this.nextLeft),
                        width: Math.abs(this.selectWidth - this.nextWidth),
                    },
                ];
            } else if (absMax > max) {
                // 相交
                // console.log('h:相交')
                lines = [
                    {
                        left: Math.min(this.nextRight, this.selectRight),
                        width:
                            this.selectLeft > this.nextLeft
                                ? Math.abs(this.selectRight - this.nextRight)
                                : Math.abs(this.selectRight - this.nextRight),
                    },
                ];
            } else {
                // 包含
                // console.log('h:包含')
                lines = [
                    {
                        left:
                            this.selectWidth > this.nextWidth
                                ? this.selectLeft
                                : this.nextLeft,
                        width: Math.abs(this.selectLeft - this.nextLeft),
                    },
                    {
                        left:
                            this.selectWidth > this.nextWidth
                                ? this.nextRight
                                : this.selectRight,
                        width: Math.abs(this.selectRight - this.nextRight),
                    },
                ];
            }
        }
        lines.map((item) => {
            item["height"] = 1;
            item["isShow"] = true;
            item["top"] = this.nextTop + this.nextHeight / 2;
            return item;
        });
        return lines;
    }
}

export default Distance;
