(function () {
    var LayerId, LayerInfo,
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

    module.exports = LayerId = (function (_super) {
        __extends(LayerId, _super);

        function LayerId() {
            return LayerId.__super__.constructor.apply(this, arguments);
        }

        LayerId.shouldParse = function (key) {
            return key === 'lyid';
        };

        LayerId.prototype.parse = function () {
            return this.id = this.file.readInt();
        };

        return LayerId;

    })(LayerInfo);

}).call(this);