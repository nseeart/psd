(function () {
    var Descriptor, LayerInfo, Metadata,
        __extends = function (child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }

            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        },
        __hasProp = {}.hasOwnProperty;

    LayerInfo = require('../layer_info.js');

    Descriptor = require('../descriptor.js');

    module.exports = Metadata = (function (_super) {
        __extends(Metadata, _super);

        function Metadata() {
            return Metadata.__super__.constructor.apply(this, arguments);
        }

        Metadata.shouldParse = function (key) {
            return key === 'shmd';
        };

        Metadata.prototype.parse = function () {
            var copyOnSheetDup, count, end, i, key, len, _i, _results;
            count = this.file.readInt();
            _results = [];
            for (i = _i = 0; 0 <= count ? _i < count : _i > count; i = 0 <= count ? ++_i : --_i) {
                this.file.seek(4, true);
                key = this.file.readString(4);
                copyOnSheetDup = this.file.readByte();
                this.file.seek(3, true);
                len = this.file.readInt();
                end = this.file.tell() + len;
                if (key === 'cmls') {
                    this.parseLayerComps();
                }
                _results.push(this.file.seek(end));
            }
            return _results;
        };

        Metadata.prototype.parseLayerComps = function () {
            this.file.seek(4, true);
            return this.data.layerComp = new Descriptor(this.file).parse();
        };

        return Metadata;

    })(LayerInfo);

}).call(this);