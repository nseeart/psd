(function () {
    var LayerInfo, LayerNameSource,
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

    module.exports = LayerNameSource = (function (_super) {
        __extends(LayerNameSource, _super);

        function LayerNameSource() {
            return LayerNameSource.__super__.constructor.apply(this, arguments);
        }

        LayerNameSource.shouldParse = function (key) {
            return key === 'lnsr';
        };

        LayerNameSource.prototype.parse = function () {
            return this.id = this.file.readString(4);
        };

        return LayerNameSource;

    })(LayerInfo);

}).call(this);