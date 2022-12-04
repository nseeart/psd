import { pad2 } from "./util";
import Layer from "./layer";

export default class LayerMask {
    constructor(file, header) {
        this.file = file;
        this.header = header;
        this.layers = [];
        this.mergedAlpha = false;
        this.globalMask = null;
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
        const layerInfoSize = pad2(this.file.readInt());
        if (layerInfoSize > 0) {
            //层数: 如果为负数，则其绝对值为层数，第一个 alpha 通道包含合并结果的透明度数据。
            let layerCount = this.file.readShort();
            if (layerCount < 0) {
                layerCount = Math.abs(layerCount);
                this.mergedAlpha = true;
            }
            let i, _i;
            for (
                i = _i = 0;
                0 <= layerCount ? _i < layerCount : _i > layerCount;
                i = 0 <= layerCount ? ++_i : --_i
            ) {
                const layer = new Layer(this.file, this.header).parse();
                this.layers.push(layer);
            }
            const _ref = this.layers;
            const _results = [];
            const _len = _ref.length;
            for (let _j = 0; _j < _len; _j++) {
                const layer = _ref[_j];
                _results.push(layer.parseChannelImage());
            }
            return _results;
        }
    }

    // Global layer mask info
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
