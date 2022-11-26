(function () {
    var LayerInfo, Locked,
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

    module.exports = Locked = (function (_super) {
        __extends(Locked, _super);

        Locked.shouldParse = function (key) {
            return key === 'lspf';
        };

        function Locked(layer, length) {
            Locked.__super__.constructor.call(this, layer, length);
            this.transparencyLocked = false;
            this.compositeLocked = false;
            this.positionLocked = false;
            this.allLocked = false;
        }

        Locked.prototype.parse = function () {
            var locked;
            locked = this.file.readInt();
            this.transparencyLocked = (locked & (0x01 << 0)) > 0 || locked === -2147483648;
            this.compositeLocked = (locked & (0x01 << 1)) > 0 || locked === -2147483648;
            this.positionLocked = (locked & (0x01 << 2)) > 0 || locked === -2147483648;
            return this.allLocked = this.transparencyLocked && this.compositeLocked && this.positionLocked;
        };

        return Locked;

    })(LayerInfo);

}).call(this);