export default Layer;
declare class Layer {
    static includes: typeof Module.includes;
    constructor(file: any, header: any);
    file: any;
    header: any;
    mask: {};
    blendingRanges: {};
    adjustments: {};
    channelsInfo: any[];
    blendMode: {};
    groupLayer: any;
    infoKeys: any[];
    get name(): any;
    parse(): Layer;
    layerEnd: any;
    export(): {
        name: any;
        top: any;
        right: any;
        bottom: any;
        left: any;
        width: any;
        height: any;
        opacity: any;
        visible: any;
        clipped: any;
        mask: any;
    };
}
import Module from "./module";
