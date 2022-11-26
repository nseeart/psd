(function () {
    var Descriptor, LayerInfo, ObjectEffects,
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

    module.exports = ObjectEffects = (function (_super) {
        __extends(ObjectEffects, _super);

        function ObjectEffects() {
            return ObjectEffects.__super__.constructor.apply(this, arguments);
        }

        ObjectEffects.shouldParse = function (key) {
            return key === 'lfx2';
        };

        ObjectEffects.prototype.parse = function () {
            this.file.seek(8, true);
            return this.data = new Descriptor(this.file).parse();
        };

        return ObjectEffects;

    })(LayerInfo);

}).call(this);