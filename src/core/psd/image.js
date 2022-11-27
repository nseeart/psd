import { cmykToRgb } from "./color";

const __slice = [].slice;

class ImageBase {
    COMPRESSIONS = ["Raw", "RLE", "ZIP", "ZIPPrediction"];
    constructor(file, header) {
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
        this.toPng = () => this.toPng2();
    }

    setChannelsInfo() {
        switch (this.mode()) {
            case 1:
                return this.setGreyscaleChannels();
            case 3:
                return this.setRgbChannels();
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
        let _ref1;
        this.compression = this.parseCompression();
        if ((_ref1 = this.compression) === 2 || _ref1 === 3) {
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

    // ImageFormat.RAW
    parseRaw() {
        return (this.channelData = this.file.read(this.length));
    }

    // ImageFormat.RLE
    parseRLE() {
        this.byteCounts = this.parseByteCounts();
        return this.parseChannelData();
    }
    parseByteCounts() {
        let i, _i, _ref;
        const _results = [];
        for (
            i = _i = 0, _ref = this.channels() * this.height();
            0 <= _ref ? _i < _ref : _i > _ref;
            i = 0 <= _ref ? ++_i : --_i
        ) {
            _results.push(this.file.readShort());
        }
        return _results;
    }
    parseChannelData() {
        var i, _i, _ref;
        this.chanPos = 0;
        this.lineIndex = 0;
        const _results = [];
        for (
            i = _i = 0, _ref = this.channels();
            0 <= _ref ? _i < _ref : _i > _ref;
            i = 0 <= _ref ? ++_i : --_i
        ) {
            this.decodeRLEChannel();
            _results.push((this.lineIndex += this.height()));
        }
        return _results;
    }
    decodeRLEChannel() {
        let byteCount, finish, i, j, len, val, _i, _ref, _results;
        _results = [];
        for (
            j = _i = 0, _ref = this.height();
            0 <= _ref ? _i < _ref : _i > _ref;
            j = 0 <= _ref ? ++_i : --_i
        ) {
            byteCount = this.byteCounts[this.lineIndex + j];
            finish = this.file.tell() + byteCount;
            _results.push(
                function () {
                    var _ref1, _results1;
                    _results1 = [];
                    while (this.file.tell() < finish) {
                        len = this.file.read(1)[0];
                        if (len < 128) {
                            len += 1;
                            (_ref1 = this.channelData).splice.apply(
                                _ref1,
                                [this.chanPos, 0].concat(
                                    __slice.call(this.file.read(len))
                                )
                            );
                            _results1.push((this.chanPos += len));
                        } else if (len > 128) {
                            len ^= 0xff;
                            len += 2;
                            val = this.file.read(1)[0];
                            _results1.push(
                                function () {
                                    var _j, _results2;
                                    _results2 = [];
                                    for (
                                        i = _j = 0;
                                        0 <= len ? _j < len : _j > len;
                                        i = 0 <= len ? ++_j : --_j
                                    ) {
                                        _results2.push(
                                            (this.channelData[this.chanPos++] =
                                                val)
                                        );
                                    }
                                    return _results2;
                                }.call(this)
                            );
                        } else {
                            _results1.push(void 0);
                        }
                    }
                    return _results1;
                }.call(this)
            );
        }
        return _results;
    }

    // ImageMode.Greyscale
    setGreyscaleChannels() {
        this.channelsInfo = [
            {
                id: 0,
            },
        ];
        if (this.channels() === 2) {
            return this.channelsInfo.push({
                id: -1,
            });
        }
    }
    combineGreyscaleChannel() {
        var alpha, grey, i, _i, _ref, _results;
        _results = [];
        for (
            i = _i = 0, _ref = this.numPixels;
            0 <= _ref ? _i < _ref : _i > _ref;
            i = 0 <= _ref ? ++_i : --_i
        ) {
            grey = this.channelData[i];
            alpha =
                this.channels() === 2
                    ? this.channelData[this.channelLength + i]
                    : 255;
            _results.push(this.pixelData.push(grey, grey, grey, alpha));
        }
        return _results;
    }

    // ImageMode.RGB
    setRgbChannels() {
        this.channelsInfo = [
            {
                id: 0,
            },
            {
                id: 1,
            },
            {
                id: 2,
            },
        ];
        if (this.channels() === 4) {
            return this.channelsInfo.push({
                id: -1,
            });
        }
    }
    combineRgbChannel() {
        var a,
            b,
            chan,
            g,
            i,
            index,
            r,
            rgbChannels,
            val,
            _i,
            _j,
            _len,
            _ref,
            _results;
        rgbChannels = this.channelsInfo
            .map(function (ch) {
                return ch.id;
            })
            .filter(function (ch) {
                return ch >= -1;
            });
        _results = [];
        for (
            i = _i = 0, _ref = this.numPixels;
            0 <= _ref ? _i < _ref : _i > _ref;
            i = 0 <= _ref ? ++_i : --_i
        ) {
            r = g = b = 0;
            a = 255;
            for (
                index = _j = 0, _len = rgbChannels.length;
                _j < _len;
                index = ++_j
            ) {
                chan = rgbChannels[index];
                val = this.channelData[i + this.channelLength * index];
                switch (chan) {
                    case -1:
                        a = val;
                        break;
                    case 0:
                        r = val;
                        break;
                    case 1:
                        g = val;
                        break;
                    case 2:
                        b = val;
                }
            }
            _results.push(this.pixelData.push(r, g, b, a));
        }
        return _results;
    }

    // ImageMode.CMYK
    setCmykChannels() {
        this.channelsInfo = [
            {
                id: 0,
            },
            {
                id: 1,
            },
            {
                id: 2,
            },
            {
                id: 3,
            },
        ];
        if (this.channels() === 5) {
            return this.channelsInfo.push({
                id: -1,
            });
        }
    }
    combineCmykChannel() {
        let a,
            b,
            c,
            chan,
            g,
            i,
            index,
            k,
            m,
            r,
            val,
            y,
            _i,
            _j,
            _len,
            _ref,
            _ref1;
        const cmykChannels = this.channelsInfo
            .map(function (ch) {
                return ch.id;
            })
            .filter(function (ch) {
                return ch >= -1;
            });
        const _results = [];
        for (
            i = _i = 0, _ref = this.numPixels;
            0 <= _ref ? _i < _ref : _i > _ref;
            i = 0 <= _ref ? ++_i : --_i
        ) {
            c = m = y = k = 0;
            a = 255;
            for (
                index = _j = 0, _len = cmykChannels.length;
                _j < _len;
                index = ++_j
            ) {
                chan = cmykChannels[index];
                val = this.channelData[i + this.channelLength * index];
                switch (chan) {
                    case -1:
                        a = val;
                        break;
                    case 0:
                        c = val;
                        break;
                    case 1:
                        m = val;
                        break;
                    case 2:
                        y = val;
                        break;
                    case 3:
                        k = val;
                }
            }
            (_ref1 = cmykToRgb(255 - c, 255 - m, 255 - y, 255 - k)),
                (r = _ref1[0]),
                (g = _ref1[1]),
                (b = _ref1[2]);
            _results.push(this.pixelData.push(r, g, b, a));
        }
        return _results;
    }
    // Export.PNG
    toBase64() {
        let i, _i, _len;
        const canvas = document.createElement("canvas");
        canvas.width = this.width();
        canvas.height = this.height();
        const context = canvas.getContext("2d");
        const imageData = context.getImageData(
            0,
            0,
            this.width(),
            this.height()
        );
        const pixelData = imageData.data;
        const _ref = this.pixelData;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            pixelData[i] = _ref[i];
        }
        context.putImageData(imageData, 0, 0);
        return canvas.toDataURL("image/png");
    }
    toPng2() {
        const dataUrl = this.toBase64();
        const image = new Image();
        image.width = this.width();
        image.height = this.height();
        image.src = dataUrl;
        return image;
    }
    saveAsPng() {
        throw "Not available in the browser. Use toPng() instead.";
    }
}

// includes(Image, ImageFormat.RAW);

// includes(Image, ImageFormat.RLE);

// includes(Image, ImageMode.Greyscale);

// includes(Image, ImageMode.RGB);

// includes(Image, ImageMode.CMYK);

// includes(Image, Export.PNG);

export default ImageBase;
