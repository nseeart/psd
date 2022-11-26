(function () {
    var BlendClippingElements, LayerInfo,
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

    module.exports = BlendClippingElements = (function (_super) {
        __extends(BlendClippingElements, _super);

        function BlendClippingElements() {
            return BlendClippingElements.__super__.constructor.apply(this, arguments);
        }

        BlendClippingElements.shouldParse = function (key) {
            return key === 'clbl';
        };

        BlendClippingElements.prototype.parse = function () {
            this.enabled = this.file.readBoolean();
            return this.file.seek(3, true);
        };

        return BlendClippingElements;

    })(LayerInfo);

}).call(this);