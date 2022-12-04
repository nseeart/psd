export default class PathRecord {
    constructor(file: any);
    file: any;
    recordType: any;
    parse(): any;
    export(): any;
    isBezierPoint(): boolean;
    _readPathRecord(): any;
    numPoints: any;
    _readBezierPoint(): any;
    linked: boolean | undefined;
    precedingVert: any;
    precedingHoriz: any;
    anchorVert: any;
    anchorHoriz: any;
    leavingVert: any;
    leavingHoriz: any;
    _readClipboardRecord(): any;
    clipboardTop: any;
    clipboardLeft: any;
    clipboardBottom: any;
    clipboardRight: any;
    clipboardResolution: any;
    _readInitialFill(): any;
    initialFill: any;
}
