/**
 * https://www.adobe.com/devnet-apps/photoshop/fileformatashtml/
 */
export default class PSD {
    static Node: {
        Root: typeof Root;
    };
    static fromURL(url: any): any;
    static fromEvent(e: any): any;
    static fromDroppedFile(file: any): any;
    constructor(data: any);
    file: File;
    parsed: boolean;
    header: Header | null;
    colorModeData: ColorModeData | null;
    get layers(): any;
    parse(): true | undefined;
    parseHeader(): any;
    parseColorModeData(): any;
    parseImageResources(): LazyExecute;
    resources: LazyExecute | undefined;
    parseLayerMask(): LazyExecute;
    layerMask: LazyExecute | undefined;
    parseImageData(): LazyExecute;
    image: LazyExecute | undefined;
    tree(): Root;
}
import File from "./psd/file";
import Header from "./psd/header";
import ColorModeData from "./psd/color_mode_data";
import LazyExecute from "./psd/lazy_execute";
import Root from "./psd/nodes/root";
