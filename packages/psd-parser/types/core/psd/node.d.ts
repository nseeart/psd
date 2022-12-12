export default Node;
declare class Node {
    static includes: typeof Module.includes;
    static PROPERTIES: string[];
    constructor(layer: any, parent: any);
    type: string;
    layer: any;
    parent: any;
    _children: any[];
    name: any;
    forceVisible: any;
    coords: {
        top: any;
        bottom: any;
        left: any;
        right: any;
    };
    topOffset: number;
    leftOffset: number;
    set top(arg: any);
    get top(): any;
    set right(arg: any);
    get right(): any;
    set bottom(arg: any);
    get bottom(): any;
    set left(arg: any);
    get left(): any;
    get width(): number;
    get height(): number;
    get(prop: any): any;
    get(prop: any): any;
    visible(): any;
    hidden(): boolean;
    isLayer(): boolean;
    isGroup(): boolean;
    isRoot(): boolean;
    clippingMask(): any;
    clippingMaskCached: any;
    clippedBy(): any;
    export(): {
        type: null;
        visible: any;
        opacity: number;
        blendingMode: any;
    };
    updateDimensions(): number | undefined;
}
import Module from "./module";
