import ImageExport from "./image_export";
import ImageFormat from "./image_format";
import ImageMode from "./image_mode";
import { includes } from "./util";

export default class ImageBase {
    COMPRESSIONS = ["Raw", "RLE", "ZIP", "ZIPPrediction"];
    constructor(file, header, layer = null) {
        this.layer = layer;
        this.file = file;
        this.header = header;
        this.numPixels = this.width() * this.height();
        if (this.depth() === 16) {
            this.numPixels *= 2;
        }
        this.calculateLength();
        this.pixelData = [];
        this.channelData = [];
        this.opacity = 1.0;
        this.hasMask = false;
        this.startPos = this.file.tell();
        this.endPos = this.startPos + this.length;
        this.setChannelsInfo();
    }

    setChannelsInfo() {
        switch (this.mode()) {
            // Grayscale = 1;
            case 1:
                return this.setGreyscaleChannels();
            // RGB = 3;
            case 3:
                return this.setRgbChannels();
            // CMYK = 4;
            case 4:
                return this.setCmykChannels();
        }
    }

    calculateLength() {
        this.length = ((self) => {
            switch (self.depth()) {
                case 1:
                    return ((self.width() + 7) / 8) * self.height();
                case 16:
                    return self.width() * self.height() * 2;
                default:
                    return self.width() * self.height();
            }
        })(this);
        this.channelLength = this.length;
        return (this.length *= this.channels());
    }

    parse() {
        this.compression = this.parseCompression();
        if (this.compression === 2 || this.compression === 3) {
            this.file.seek(this.endPos);
            return;
        }

        return this.parseImageData();
    }

    parseCompression() {
        return this.file.readShort();
    }

    parseImageData() {
        switch (this.compression) {
            case 0:
                this.parseRaw();
                break;
            case 1:
                this.parseRLE();
                break;
            case 2:
            case 3:
                this.parseZip();
                break;
            default:
                this.file.seek(this.endPos);
        }
        return this.processImageData();
    }

    processImageData() {
        switch (this.mode()) {
            case 1:
                this.combineGreyscaleChannel();
                break;
            case 3:
                this.combineRgbChannel();
                break;
            case 4:
                this.combineCmykChannel();
        }
        return (this.channelData = null);
    }

    width() {
        return this.header.width;
    }

    height() {
        return this.header.height;
    }
    channels() {
        return this.header.channels;
    }
    depth() {
        return this.header.depth;
    }
    mode() {
        return this.header.mode;
    }
}

includes(ImageBase, ImageFormat.RAW);

includes(ImageBase, ImageFormat.RLE);

includes(ImageBase, ImageMode.Greyscale);

includes(ImageBase, ImageMode.RGB);

includes(ImageBase, ImageMode.CMYK);

includes(ImageBase, ImageExport.PNG);