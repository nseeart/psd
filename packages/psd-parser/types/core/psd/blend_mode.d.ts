export default BlendMode;
declare class BlendMode extends Module {
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
}
import Module from "./module";
