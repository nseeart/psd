import { pad2 } from "./util2";
import Layer from "./layer";
const _ = require("lodash");

export default class LayerMask {
    constructor(file, header) {
        this.file = file;
        this.header = header;
        this.layers = [];
        this.mergedAlpha = false;
        this.globalMask = null;
        console.log("this.globalMask", this.globalMask);
    }

    skip() {
        return this.file.seek(this.file.readInt(), true);
    }

    parse() {
        const maskSize = this.file.readInt();
        const finish = maskSize + this.file.tell();
        if (maskSize <= 0) {
            return;
        }
        this.parseLayers();
        this.parseGlobalMask();
        this.layers.reverse();
        return this.file.seek(finish);
    }

    parseLayers() {
        let i, _i, _j, _len;
        const layerInfoSize = pad2(this.file.readInt());
        if (layerInfoSize > 0) {
            let layerCount = this.file.readShort();
            if (layerCount < 0) {
                layerCount = Math.abs(layerCount);
                this.mergedAlpha = true;
            }
            for (
                i = _i = 0;
                0 <= layerCount ? _i < layerCount : _i > layerCount;
                i = 0 <= layerCount ? ++_i : --_i
            ) {
                this.layers.push(new Layer(this.file, this.header).parse());
            }
            const _ref = this.layers;
            const _results = [];
            for (_j = 0, _len = _ref.length; _j < _len; _j++) {
                const layer = _ref[_j];
                _results.push(layer.parseChannelImage());
            }
            return _results;
        }
    }

    parseGlobalMask() {
        const length = this.file.readInt();
        if (length <= 0) {
            return;
        }
        const maskEnd = this.file.tell() + length;
        this.globalMask = _({}).tap(
            (function (_this) {
                return function (mask) {
                    mask.overlayColorSpace = _this.file.readShort();
                    mask.colorComponents = [
                        _this.file.readShort() >> 8,
                        _this.file.readShort() >> 8,
                        _this.file.readShort() >> 8,
                        _this.file.readShort() >> 8,
                    ];
                    mask.opacity = _this.file.readShort() / 16.0;
                    return (mask.kind = _this.file.readByte());
                };
            })(this)
        );

        return this.file.seek(maskEnd);
    }
}
