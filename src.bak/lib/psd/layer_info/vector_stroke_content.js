(function () {
    var Descriptor, LayerInfo, VectorStrokeContent,
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

    module.exports = VectorStrokeContent = (function (_super) {
        __extends(VectorStrokeContent, _super);

        function VectorStrokeContent() {
            return VectorStrokeContent.__super__.constructor.apply(this, arguments);
        }

        VectorStrokeContent.shouldParse = function (key) {
            return key === 'vscg';
        };

        VectorStrokeContent.prototype.parse = function () {
            this.file.seek(8, true);
            return this.data = new Descriptor(this.file).parse();
        };

        return VectorStrokeContent;

    })(LayerInfo);

}).call(this);