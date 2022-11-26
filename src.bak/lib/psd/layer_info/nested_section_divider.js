(function () {
    var LayerInfo, NestedSectionDivider,
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

    module.exports = NestedSectionDivider = (function (_super) {
        __extends(NestedSectionDivider, _super);

        NestedSectionDivider.shouldParse = function (key) {
            return key === 'lsdk';
        };

        function NestedSectionDivider(layer, length) {
            NestedSectionDivider.__super__.constructor.call(this, layer, length);
            this.isFolder = false;
            this.isHidden = false;
        }

        NestedSectionDivider.prototype.parse = function () {
            var code;
            code = this.file.readInt();
            switch (code) {
                case 1:
                case 2:
                    return this.isFolder = true;
                case 3:
                    return this.isHidden = true;
            }
        };

        return NestedSectionDivider;

    })(LayerInfo);

}).call(this);