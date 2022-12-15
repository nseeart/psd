export default class Layer extends Node {
    constructor(...args: any[]);
    layerType: string;
    isEmpty(): boolean;
    isVector(): boolean;
    getLayerInfo(layerInfo: any): any;
    getPathPosition(pathNode?: {}): {
        x: any;
        y: any;
    };
    parsePath(path: any, { width, height }: {
        width: any;
        height: any;
    }): {
        preceding: {
            relX: any;
            relY: any;
            x: number;
            y: number;
        };
        anchor: {
            relX: any;
            relY: any;
            x: number;
            y: number;
        };
        leaving: {
            relX: any;
            relY: any;
            x: number;
            y: number;
        };
    };
    toPathD(paths: any): string;
    getVectorStroke(): any;
    getVectorStrokeContent(): any;
    getSolidColor(): any;
    getVectorOrigination(): any;
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
    getVectorMask(): {
        d: string;
        paths: any[];
    } | undefined;
    getText(): any;
    parseVectorStrokeStyle(strokeStyleLineDashSet: any): "solid" | "dotted" | "dashed";
    parseVectorStrokeColor(strokeStyleContent: any): number[];
    parseVectorStrokeRadius(vectorOrigination: any): any;
    parseVectorStroke(vectorStroke: any, vectorOrigination: any): {
        width: any;
        style: string;
        color: number[];
        opacity: any;
    } | undefined;
    export(): any;
}
import Node from "../node";
