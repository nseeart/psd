import ImageExport from "./image_export";
import ImageFormat from "./image_format";
import ImageMode from "./image_mode";
import { includes } from "./util";
import Module from "./module";

const COMPRESSIONS = ["Raw", "RLE", "ZIP", "ZIPPrediction"];
function Image(file, header) {
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

Image.includes = Module.includes;

Image.prototype.setChannelsInfo = function () {
    switch (this.mode()) {
        case 1:
            return this.setGreyscaleChannels();
        case 3:
            return this.setRgbChannels();
        case 4:
            return this.setCmykChannels();
    }
};

Image.prototype.calculateLength = function () {
    this.length = function () {
        switch (this.depth()) {
            case 1:
                return ((this.width() + 7) / 8) * this.height();
            case 16:
                return this.width() * this.height() * 2;
            default:
                return this.width() * this.height();
        }
    }.call(this);
    this.channelLength = this.length;
    return (this.length *= this.channels());
};

Image.prototype.parse = function () {
    var _ref1;
    this.compression = this.parseCompression();
    if ((_ref1 = this.compression) === 2 || _ref1 === 3) {
        this.file.seek(this.endPos);
        return;
    }
    return this.parseImageData();
};

Image.prototype.parseCompression = function () {
    return this.file.readShort();
};

Image.prototype.parseImageData = function () {
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
};

Image.prototype.processImageData = function () {
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
};

const _ref = ["width", "height", "channels", "depth", "mode"];
const _fn = function (attr) {
    return (Image.prototype[attr] = function () {
        return this.header[attr];
    });
};
const _len = _ref.length;
for (let _i = 0; _i < _len; _i++) {
    const attr = _ref[_i];
    _fn(attr);
}

Image.includes(ImageFormat.RAW);
Image.includes(ImageFormat.RLE);
Image.includes(ImageMode.Greyscale);
Image.includes(ImageMode.RGB);
Image.includes(ImageMode.CMYK);
Image.includes(ImageExport.PNG);

export default Image;
