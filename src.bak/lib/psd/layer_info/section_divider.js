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
        var SECTION_DIVIDER_TYPES;

        __extends(NestedSectionDivider, _super);

        NestedSectionDivider.shouldParse = function (key) {
            return key === 'lsct';
        };

        SECTION_DIVIDER_TYPES = ['other', 'open folder', 'closed folder', 'bounding section divider'];

        function NestedSectionDivider(layer, length) {
            NestedSectionDivider.__super__.constructor.call(this, layer, length);
            this.isFolder = false;
            this.isHidden = false;
            this.layerType = null;
            this.blendMode = null;
            this.subType = null;
        }

        NestedSectionDivider.prototype.parse = function () {
            var code;
            code = this.file.readInt();
            this.layerType = SECTION_DIVIDER_TYPES[code];
            switch (code) {
                case 1:
                case 2:
                    this.isFolder = true;
                    break;
                case 3:
                    this.isHidden = true;
            }
            if (!(this.length >= 12)) {
                return;
            }
            this.file.seek(4, true);
            this.blendMode = this.file.readString(4);
            if (!(this.length >= 16)) {
                return;
            }
            return this.subType = this.file.readInt() === 0 ? 'normal' : 'scene group';
        };

        return NestedSectionDivider;

    })(LayerInfo);

}).call(this);