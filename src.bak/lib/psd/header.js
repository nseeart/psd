(function () {
    var Header, Module,
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

    module.exports = Header = (function (_super) {
        var MODES;

        __extends(Header, _super);

        Header.aliasProperty('height', 'rows');

        Header.aliasProperty('width', 'cols');

        MODES = ['Bitmap', 'GrayScale', 'IndexedColor', 'RGBColor', 'CMYKColor', 'HSLColor', 'HSBColor', 'Multichannel', 'Duotone', 'LabColor', 'Gray16', 'RGB48', 'Lab48', 'CMYK64', 'DeepMultichannel', 'Duotone16'];

        Header.prototype.sig = null;

        Header.prototype.version = null;

        Header.prototype.channels = null;

        Header.prototype.rows = null;

        Header.prototype.cols = null;

        Header.prototype.depth = null;

        Header.prototype.mode = null;

        function Header(_at_file) {
            this.file = _at_file;
        }

        Header.prototype.parse = function () {

            this.sig = this.file.readString(4);
            if (this.sig !== '8BPS') {
                throw new Error('Invalid file signature detected. Got: ' + this.sig + '. Expected 8BPS.');
            }
            this.version = this.file.readUShort();
            this.file.seek(6, true);
            this.channels = this.file.readUShort();
            this.rows = this.height = this.file.readUInt();
            this.cols = this.width = this.file.readUInt();
            this.depth = this.file.readUShort();
            this.mode = this.file.readUShort();
            let colorDataLen = this.file.readUInt();
            return this.file.seek(colorDataLen, true);
        };

        Header.prototype.modeName = function () {
            return MODES[this.mode];
        };

        Header.prototype["export"] = function () {
            var data, key, _i, _len, _ref;
            data = {};
            _ref = ['sig', 'version', 'channels', 'rows', 'cols', 'depth', 'mode'];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                key = _ref[_i];
                data[key] = this[key];
            }
            return data;
        };

        return Header;

    })(Module);

}).call(this);