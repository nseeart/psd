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
    depth(): any[];
    opacity(): number;
    fillOpacity(): number;
    export(): {
        children: any[];
        document: {
            width: any;
            height: any;
            resources: {
                layerComps: any;
                guides: never[];
                slices: never[];
            };
        };
    };
    buildHeirarchy(): any;
}
import Node from "../node";
