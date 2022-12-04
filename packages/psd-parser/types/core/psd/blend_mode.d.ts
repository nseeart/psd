export default BlendMode;
declare class BlendMode {
    constructor(file: any);
    file: any;
    signature: any;
    blendKey: any;
    opacity: any;
    clipping: any;
    clipped: boolean | null;
    flags: any;
    mode: any;
    visible: boolean | null;
    parse(): any;
    opacityPercentage(): number;
    set blendingMode(arg: any);
    get blendingMode(): any;
}
