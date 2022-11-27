import { includes } from "./module";
import ImageBase from "./image";
import ImageFormat from "./image_format";

const __extends = function (child, parent) {
    for (var key in parent) {
        if (Object.hasOwnProperty.call(parent, key)) child[key] = parent[key];
    }
    function ctor() {
        this.constructor = child;
    }

    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
};

function ChannelImage(file, header, layer) {
    this.layer = layer;
    this._width = this.layer.width;
    this._height = this.layer.height;
    ChannelImage.__super__.constructor.call(this, file, header);
    this.channelsInfo = this.layer.channelsInfo;
    this.hasMask = this.channelsInfo.some((c) => c.id < -1);
    this.opacity = this.layer.opacity / 255.0;
    this.maskData = [];
}

__extends(ChannelImage, ImageBase);

includes(ChannelImage, ImageFormat.LayerRAW);

includes(ChannelImage, ImageFormat.LayerRLE);

ChannelImage.prototype.skip = function () {
    var chan, _i, _len, _ref, _results;
    _ref = this.channelsInfo;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        chan = _ref[_i];
        _results.push(this.file.seek(chan.length, true));
    }
    return _results;
};

ChannelImage.prototype.width = function () {
    return this._width;
};

ChannelImage.prototype.height = function () {
    return this._height;
};

ChannelImage.prototype.channels = function () {
    return this.layer.channels;
};

ChannelImage.prototype.parse = function () {
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
};

ChannelImage.prototype.parseImageData = function () {
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
};

export default ChannelImage;
