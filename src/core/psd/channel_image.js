import { includes } from "./module";
import ImageBase from "./image";
import ImageFormat from "./image_format";

class ChannelImage extends ImageBase {
    constructor(file, header, layer) {
        super(file, header);
        this.layer = layer;
        this._width = this.layer.width;
        this._height = this.layer.height;
        this.channelsInfo = this.layer.channelsInfo;
        this.hasMask = this.channelsInfo.some((c) => c.id < -1);
        this.opacity = this.layer.opacity / 255.0;
        this.maskData = [];
    }

    skip() {
        let chan, _i, _len;
        const _ref = this.channelsInfo;
        const _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            chan = _ref[_i];
            _results.push(this.file.seek(chan.length, true));
        }
        return _results;
    }

    width() {
        return this._width;
    }

    height() {
        return this._height;
    }

    channels() {
        if (this.layer) {
            return this.layer.channels;
        }
        return null;
    }

    parse() {
        var chan, finish, start, _i, _len, _ref;
        this.chanPos = 0;
        _ref = this.channelsInfo;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            chan = _ref[_i];
            if (chan.length <= 0) {
                this.parseCompression();
                continue;
            }
            this.chan = chan;
            if (chan.id < -1) {
                this._width = this.layer.mask.width;
                this._height = this.layer.mask.height;
            } else {
                this._width = this.layer.width;
                this._height = this.layer.height;
            }
            this.length = this._width * this._height;
            start = this.file.tell();
            this.parseImageData();
            finish = this.file.tell();
            if (finish !== start + this.chan.length) {
                this.file.seek(start + this.chan.length);
            }
        }
        this._width = this.layer.width;
        this._height = this.layer.height;
        return this.processImageData();
    }

    parseImageData() {
        this.compression = this.parseCompression();
        switch (this.compression) {
            case 0:
                return this.parseRaw();
            case 1:
                return this.parseRLE();
            case 2:
            case 3:
                return this.parseZip();
            default:
                return this.file.seek(this.endPos);
        }
    }
}

includes(ChannelImage, ImageFormat.LayerRAW);
includes(ChannelImage, ImageFormat.LayerRLE);

export default ChannelImage;
