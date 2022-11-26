(function () {
    var BlendMode, Module,
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

    module.exports = BlendMode = (function (_super) {
        var BLEND_MODES;

        __extends(BlendMode, _super);

        BlendMode.aliasProperty('blendingMode', 'mode');

        BLEND_MODES = {
            norm: 'normal',
            dark: 'darken',
            lite: 'lighten',
            hue: 'hue',
            sat: 'saturation',
            colr: 'color',
            lum: 'luminosity',
            mul: 'multiply',
            scrn: 'screen',
            diss: 'dissolve',
            over: 'overlay',
            hLit: 'hard_light',
            sLit: 'soft_light',
            diff: 'difference',
            smud: 'exclusion',
            div: 'color_dodge',
            idiv: 'color_burn',
            lbrn: 'linear_burn',
            lddg: 'linear_dodge',
            vLit: 'vivid_light',
            lLit: 'linear_light',
            pLit: 'pin_light',
            hMix: 'hard_mix',
            pass: 'passthru',
            dkCl: 'darker_color',
            lgCl: 'lighter_color',
            fsub: 'subtract',
            fdiv: 'divide'
        };

        function BlendMode(_at_file) {
            this.file = _at_file;
            this.blendKey = null;
            this.opacity = null;
            this.clipping = null;
            this.clipped = null;
            this.flags = null;
            this.mode = null;
            this.visible = null;
        }

        BlendMode.prototype.parse = function () {
            this.file.seek(4, true);
            this.blendKey = this.file.readString(4).trim();
            this.opacity = this.file.readByte();
            this.clipping = this.file.readByte();
            this.flags = this.file.readByte();
            this.mode = BLEND_MODES[this.blendKey];
            this.clipped = this.clipping === 1;
            this.visible = !((this.flags & (0x01 << 1)) > 0);
            return this.file.seek(1, true);
        };

        BlendMode.prototype.opacityPercentage = function () {
            return this.opacity * 100 / 255;
        };

        return BlendMode;

    })(Module);

}).call(this);