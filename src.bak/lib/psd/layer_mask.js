(function () {
    var Layer, LayerMask, Util, _;

    _ = require('lodash');

    Util = require('./util.js');

    Layer = require('./layer.js');

    module.exports = LayerMask = (function () {
        function LayerMask(_at_file, _at_header) {
            this.file = _at_file;
            this.header = _at_header;
            this.layers = [];
            this.mergedAlpha = false;
            this.globalMask = null;
        }

        LayerMask.prototype.skip = function () {
            return this.file.seek(this.file.readInt(), true);
        };

        LayerMask.prototype.parse = function () {
            var finish, maskSize;
            maskSize = this.file.readInt();
            finish = maskSize + this.file.tell();
            if (maskSize <= 0) {
                return;
            }
            this.parseLayers();
            this.parseGlobalMask();
            this.layers.reverse();
            return this.file.seek(finish);
        };

        LayerMask.prototype.parseLayers = function () {
            var i, layer, layerCount, layerInfoSize, _i, _j, _len, _ref, _results;
            layerInfoSize = Util.pad2(this.file.readInt());
            if (layerInfoSize > 0) {
                layerCount = this.file.readShort();
                if (layerCount < 0) {
                    layerCount = Math.abs(layerCount);
                    this.mergedAlpha = true;
                }
                for (i = _i = 0; 0 <= layerCount ? _i < layerCount : _i > layerCount; i = 0 <= layerCount ? ++_i : --_i) {
                    this.layers.push(new Layer(this.file, this.header).parse());
                }
                _ref = this.layers;
                _results = [];
                for (_j = 0, _len = _ref.length; _j < _len; _j++) {
                    layer = _ref[_j];
                    _results.push(layer.parseChannelImage());
                }
                return _results;
            }
        };

        LayerMask.prototype.parseGlobalMask = function () {
            var length, maskEnd;
            length = this.file.readInt();
            if (length <= 0) {
                return;
            }
            maskEnd = this.file.tell() + length;
            this.globalMask = _({}).tap((function (_this) {
                return function (mask) {
                    mask.overlayColorSpace = _this.file.readShort();
                    mask.colorComponents = [_this.file.readShort() >> 8, _this.file.readShort() >> 8, _this.file.readShort() >> 8, _this.file.readShort() >> 8];
                    mask.opacity = _this.file.readShort() / 16.0;
                    return mask.kind = _this.file.readByte();
                };
            })(this));
            return this.file.seek(maskEnd);
        };

        return LayerMask;

    })();

}).call(this);