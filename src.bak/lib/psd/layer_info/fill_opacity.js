(function () {
    var FillOpacity, LayerInfo,
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

    module.exports = FillOpacity = (function (_super) {
        __extends(FillOpacity, _super);

        function FillOpacity() {
            return FillOpacity.__super__.constructor.apply(this, arguments);
        }

        FillOpacity.shouldParse = function (key) {
            return key === 'iOpa';
        };

        FillOpacity.prototype.parse = function () {
            return this.value = this.file.readByte();
        };

        return FillOpacity;

    })(LayerInfo);

}).call(this);