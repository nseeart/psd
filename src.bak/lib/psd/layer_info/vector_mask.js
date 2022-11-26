(function () {
    var LayerInfo, PathRecord, VectorMask,
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

    PathRecord = require('../path_record.js');

    module.exports = VectorMask = (function (_super) {
        __extends(VectorMask, _super);

        VectorMask.shouldParse = function (key) {
            return key === 'vmsk' || key === 'vsms';
        };

        function VectorMask(layer, length) {
            VectorMask.__super__.constructor.call(this, layer, length);
            this.invert = null;
            this.notLink = null;
            this.disable = null;
            this.paths = [];
        }

        VectorMask.prototype.parse = function () {
            var i, numRecords, record, tag, _i, _results;
            this.file.seek(4, true);
            tag = this.file.readInt();
            this.invert = (tag & 0x01) > 0;
            this.notLink = (tag & (0x01 << 1)) > 0;
            this.disable = (tag & (0x01 << 2)) > 0;
            numRecords = (this.length - 10) / 26;
            _results = [];
            for (i = _i = 0; 0 <= numRecords ? _i < numRecords : _i > numRecords; i = 0 <= numRecords ? ++_i : --_i) {
                record = new PathRecord(this.file);
                record.parse();
                _results.push(this.paths.push(record));
            }
            return _results;
        };

        VectorMask.prototype["export"] = function () {
            return {
                invert: this.invert,
                notLink: this.notLink,
                disable: this.disable,
                paths: this.paths.map(function (p) {
                    return p["export"]();
                })
            };
        };

        return VectorMask;

    })(LayerInfo);

}).call(this);