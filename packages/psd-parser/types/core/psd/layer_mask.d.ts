export default class LayerMask {
    constructor(file: any, header: any);
    file: any;
    header: any;
    layers: any[];
    mergedAlpha: boolean;
    globalMask: any;
    skip(): any;
    parse(): any;
    parseLayers(): any[] | undefined;
    parseGlobalMask(): any;
}
