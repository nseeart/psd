(function () {
    var BlendInteriorElements, LayerInfo,
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

    module.exports = BlendInteriorElements = (function (_super) {
        __extends(BlendInteriorElements, _super);

        function BlendInteriorElements() {
            return BlendInteriorElements.__super__.constructor.apply(this, arguments);
        }

        BlendInteriorElements.shouldParse = function (key) {
            return key === 'infx';
        };

        BlendInteriorElements.prototype.parse = function () {
            this.enabled = this.file.readBoolean();
            return this.file.seek(3, true);
        };

        return BlendInteriorElements;

    })(LayerInfo);

}).call(this);