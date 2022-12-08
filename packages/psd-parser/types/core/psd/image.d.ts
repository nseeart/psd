export default Image;
declare function Image(file: any, header: any, layer?: null): void;
declare class Image {
    constructor(file: any, header: any, layer?: null);
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
}
