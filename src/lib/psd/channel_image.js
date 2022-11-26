import ImageBase from "./image";

const _ = require("lodash");

export default class ChannelImage extends ImageBase {
    constructor(file, header, layer) {
        super(file, header);
        this.layer = layer;

        this._width = this.layer.width;
        this._height = this.layer.height;
        this.channelsInfo = this.layer.channelsInfo;
        this.hasMask = _.any(this.channelsInfo, function (c) {
            return c.id < -1;
        });
        this.opacity = this.layer.opacity / 255.0;
        this.maskData = [];
    }

    skip() {
        var chan, _i, _len, _ref, _results;
        _ref = this.channelsInfo;
        _results = [];
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
    // ImageFormat.LayerRAW
    parseRaw() {
        var i, _i, _ref, _ref1;
        for (
            i = _i = _ref = this.chanPos,
                _ref1 = this.chanPos + this.chan.length - 2;
            _ref <= _ref1 ? _i < _ref1 : _i > _ref1;
            i = _ref <= _ref1 ? ++_i : --_i
        ) {
            this.channelData[i] = this.file.readByte();
        }
        return (this.chanPos += this.chan.length - 2);
    }
    // ImageFormat.LayerRLE
    parseByteCounts() {
        var i, _i, _ref, _results;
        _results = [];
        for (
            i = _i = 0, _ref = this.height();
            0 <= _ref ? _i < _ref : _i > _ref;
            i = 0 <= _ref ? ++_i : --_i
        ) {
            _results.push(this.file.readShort());
        }
        return _results;
    }
    parseChannelData() {
        this.lineIndex = 0;
        return this.decodeRLEChannel();
    }
}
