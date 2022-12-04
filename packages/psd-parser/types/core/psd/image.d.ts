export default class ImageBase {
    constructor(file: any, header: any, layer?: null);
    COMPRESSIONS: string[];
    layer: any;
    file: any;
    header: any;
    numPixels: number;
    pixelData: any[];
    channelData: any[];
    opacity: number;
    hasMask: boolean;
    startPos: any;
    endPos: any;
    setChannelsInfo(): any;
    calculateLength(): number;
    length: number | undefined;
    channelLength: number | undefined;
    parse(): null | undefined;
    compression: any;
    parseCompression(): any;
    parseImageData(): null;
    processImageData(): null;
    width(): any;
    height(): any;
    channels(): any;
    depth(): any;
    mode(): any;
}
