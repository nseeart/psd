export default Root;
declare class Root extends Node {
    static layerForPsd(psd: any): {
        top: number;
        left: number;
        right: any;
        bottom: any;
    };
    constructor(psd: any);
    psd: any;
    depth(): number[];
    opacity(): number;
    fillOpacity(): number;
    export(): {
        children: any[];
        document: {
            width: number;
            height: number;
            resources: {
                layerComps: any;
                guides: any;
                slices: never[];
                resolutionInfo: any;
            };
        };
    };
    buildHeirarchy(): number | undefined;
}
import Node from "../node";
