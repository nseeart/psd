(function () {
    var Layer, Module,
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

    Module = require('coffeescript-module').Module;

    module.exports = Layer = (function (_super) {
        __extends(Layer, _super);

        Layer.includes(require('./layer/position_channels.js'));

        Layer.includes(require('./layer/blend_modes.js'));

        Layer.includes(require('./layer/mask.js'));

        Layer.includes(require('./layer/blending_ranges.js'));

        Layer.includes(require('./layer/name.js'));

        Layer.includes(require('./layer/info.js'));

        Layer.includes(require('./layer/helpers.js'));

        Layer.includes(require('./layer/channel_image.js'));

        function Layer(_at_file, _at_header) {
            this.file = _at_file;
            this.header = _at_header;
            this.mask = {};
            this.blendingRanges = {};
            this.adjustments = {};
            this.channelsInfo = [];
            this.blendMode = {};
            this.groupLayer = null;
            this.infoKeys = [];
            Object.defineProperty(this, 'name', {
                get: function () {
                    if (this.adjustments['name'] != null) {
                        return this.adjustments['name'].data;
                    } else {
                        return this.legacyName;
                    }
                }
            });
        }

        Layer.prototype.parse = function () {
            var extraLen;
            this.parsePositionAndChannels();
            this.parseBlendModes();
            extraLen = this.file.readInt();
            this.layerEnd = this.file.tell() + extraLen;
            this.parseMaskData();
            this.parseBlendingRanges();
            this.parseLegacyLayerName();
            this.parseLayerInfo();
            this.file.seek(this.layerEnd);
            return this;
        };

        Layer.prototype["export"] = function () {
            return {
                name: this.name,
                top: this.top,
                right: this.right,
                bottom: this.bottom,
                left: this.left,
                width: this.width,
                height: this.height,
                opacity: this.opacity,
                visible: this.visible,
                clipped: this.clipped,
                mask: this.mask["export"]()
            };
        };

        return Layer;

    })(Module);

}).call(this);