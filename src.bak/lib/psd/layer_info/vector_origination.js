(function () {
    var Descriptor, LayerInfo, VectorOrigination,
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

    module.exports = VectorOrigination = (function (_super) {
        __extends(VectorOrigination, _super);

        function VectorOrigination() {
            return VectorOrigination.__super__.constructor.apply(this, arguments);
        }

        VectorOrigination.shouldParse = function (key) {
            return key === 'vogk';
        };

        VectorOrigination.prototype.parse = function () {
            this.file.seek(8, true);
            return this.data = new Descriptor(this.file).parse();
        };

        return VectorOrigination;

    })(LayerInfo);

}).call(this);