(function () {
    var LayerInfo, UnicodeName,
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

    module.exports = UnicodeName = (function (_super) {
        __extends(UnicodeName, _super);

        function UnicodeName() {
            return UnicodeName.__super__.constructor.apply(this, arguments);
        }

        UnicodeName.shouldParse = function (key) {
            return key === 'luni';
        };

        UnicodeName.prototype.parse = function () {
            var pos;
            pos = this.file.tell();
            this.data = this.file.readUnicodeString();
            this.file.seek(pos + this.length);
            return this;
        };

        return UnicodeName;

    })(LayerInfo);

}).call(this);