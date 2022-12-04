export default class ChannelImage extends ImageBase {
    constructor(file: any, header: any, layer: any);
    _width: any;
    _height: any;
    channelsInfo: any;
    hasMask: any;
    maskData: any[];
    skip(): any[];
    parse(): null;
    chanPos: number | undefined;
    chan: any;
    parseImageData(): any;
}
import ImageBase from "./image";
