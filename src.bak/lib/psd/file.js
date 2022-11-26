(function () {
    var Color, File, Util, iconv, jspack,
        __hasProp = {}.hasOwnProperty;

    jspack = require('jspack').jspack;

    iconv = require('iconv-lite');

    Color = require('./color.js');

    Util = require('./util.js');

    module.exports = File = (function () {
        var FORMATS, format, info, _fn;

        FORMATS = {
            Int: {
                code: '>i',
                length: 4
            },
            UInt: {
                code: '>I',
                length: 4
            },
            Short: {
                code: '>h',
                length: 2
            },
            UShort: {
                code: '>H',
                length: 2
            },
            Float: {
                code: '>f',
                length: 4
            },
            Double: {
                code: '>d',
                length: 8
            },
            LongLong: {
                code: '>q',
                length: 8
            }
        };

        _fn = function (format, info) {
            return File.prototype["read" + format] = function () {
                return this.readf(info.code, info.length)[0];
            };
        };
        for (format in FORMATS) {
            if (!__hasProp.call(FORMATS, format)) continue;
            info = FORMATS[format];
            _fn(format, info);
        }

        File.prototype.pos = 0;

        function File(_at_data) {
            this.data = _at_data;
        }

        File.prototype.tell = function () {
            return this.pos;
        };

        File.prototype.read = function (length) {
            var i, _i, _results;
            _results = [];
            for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
                _results.push(this.data[this.pos++]);
            }
            return _results;
        };

        File.prototype.readf = function (format, len) {
            if (len == null) {
                len = null;
            }
            return jspack.Unpack(format, this.read(len || jspack.CalcLength(format)));
        };

        File.prototype.seek = function (amt, rel) {
            if (rel == null) {
                rel = false;
            }
            if (rel) {
                return this.pos += amt;
            } else {
                return this.pos = amt;
            }
        };

        File.prototype.readString = function (length) {
            return String.fromCharCode.apply(null, this.read(length)).replace(/\u0000/g, "");
        };

        File.prototype.readUnicodeString = function (length) {
            if (length == null) {
                length = null;
            }
            length || (length = this.readInt());
            return iconv.decode(new Buffer(this.read(length * 2)), 'utf-16be').replace(/\u0000/g, "");
        };

        File.prototype.readByte = function () {
            return this.read(1)[0];
        };

        File.prototype.readBoolean = function () {
            return this.readByte() !== 0;
        };

        File.prototype.readSpaceColor = function () {
            var colorComponent, colorSpace, i, _i;
            colorSpace = this.readShort();
            for (i = _i = 0; _i < 4; i = ++_i) {
                colorComponent = this.readShort() >> 8;
            }
            return {
                colorSpace: colorSpace,
                components: colorComponent
            };
        };

        File.prototype.readPathNumber = function () {
            var a, arr, b, b1, b2, b3;
            a = this.readByte();
            arr = this.read(3);
            b1 = arr[0] << 16;
            b2 = arr[1] << 8;
            b3 = arr[2];
            b = b1 | b2 | b3;
            return parseFloat(a, 10) + parseFloat(b / Math.pow(2, 24), 10);
        };

        return File;

    })();

}).call(this);