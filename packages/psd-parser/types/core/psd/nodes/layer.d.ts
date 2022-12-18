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
    }): any;
    toPathPoint(paths: any[] | undefined, { closed, numPoints }: {
        closed: any;
        numPoints: any;
    }): any[];
    toPathD(paths?: any[]): string;
    getVectorStroke(): any;
    getVectorStrokeContent(): any;
    getSolidColor(): any;
    getVectorOrigination(): any;
    getPathData(paths: any, { width, height }: {
        width: any;
        height: any;
    }): {
        initialFill: undefined;
        group: any[];
        paths: any[];
        isPathGroup: boolean;
        numPoints: number;
    };
    isPathGroup(paths: any): boolean;
    convertPaths(paths: any): any[];
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
        group: any[];
        paths: any[];
        d: string;
        initialFill: undefined;
        isPathGroup: boolean;
        numPoints: number;
    } | undefined;
    getText(): any;
    parseVectorStrokeStyle(strokeStyleLineDashSet: any): "solid" | "dotted" | "dashed";
    parseVectorStrokeColor(strokeStyleContent: any): number[];
    parseVectorLinePoint(vectorOrigination: any): {
        start: {
            x: number;
            y: number;
        };
        end: {
            x: number;
            y: number;
        };
    } | undefined;
    parseVectorRadius(vectorOrigination: any): any;
    parseVectorStroke(vectorStroke: any, vectorOrigination: any): {
        width: any;
        style: string;
        color: number[];
        opacity: any;
    } | {
        width: any;
    } | undefined;
    parsePolygonPoint(poits: any): string;
    export(): any;
}
import Node from "../node";
