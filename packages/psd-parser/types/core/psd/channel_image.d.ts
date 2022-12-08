export default ChannelImage;
declare function ChannelImage(file: any, header: any, layer: any): void;
declare class ChannelImage {
    constructor(file: any, header: any, layer: any);
    layer: any;
    _width: any;
    _height: any;
    channelsInfo: any;
    hasMask: any;
    opacity: number;
    maskData: any[];
    skip(): any[];
    width(): any;
    height(): any;
    channels(): any;
    parse(): any;
    chanPos: number | undefined;
    chan: any;
    length: number | undefined;
    parseImageData(): any;
    compression: any;
}
