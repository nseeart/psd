(function () {
    var Descriptor, LayerInfo, VectorStroke,
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

    module.exports = VectorStroke = (function (_super) {
        __extends(VectorStroke, _super);

        function VectorStroke() {
            return VectorStroke.__super__.constructor.apply(this, arguments);
        }

        VectorStroke.shouldParse = function (key) {
            return key === 'vstk';
        };

        VectorStroke.prototype.parse = function () {
            this.file.seek(4, true);
            return this.data = new Descriptor(this.file).parse();
        };

        return VectorStroke;

    })(LayerInfo);

}).call(this);