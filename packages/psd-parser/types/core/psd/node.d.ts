export default Node;
declare class Node {
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
    createProperties(): Node;
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
    updateDimensions(): any;
    left: any;
    top: any;
    bottom: any;
    right: any;
}
