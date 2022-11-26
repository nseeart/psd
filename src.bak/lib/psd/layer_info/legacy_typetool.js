(function () {
    var LegacyTypeTool, TypeTool, _,
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

    _ = require('lodash');

    TypeTool = require('./typetool.js');

    module.exports = LegacyTypeTool = (function (_super) {
        __extends(LegacyTypeTool, _super);

        LegacyTypeTool.shouldParse = function (key) {
            return key === 'tySh';
        };

        function LegacyTypeTool(layer, length) {
            LegacyTypeTool.__super__.constructor.call(this, layer, length);
            this.transform = {};
            this.faces = [];
            this.styles = [];
            this.lines = [];
            this.type = 0;
            this.scalingFactor = 0;
            this.characterCount = 0;
            this.horzPlace = 0;
            this.vertPlace = 0;
            this.selectStart = 0;
            this.selectEnd = 0;
            this.color = null;
            this.antialias = null;
        }

        LegacyTypeTool.prototype.parse = function () {
            var facesCount, i, linesCount, stylesCount, _i, _j, _k;
            this.file.seek(2, true);
            this.parseTransformInfo();
            this.file.seek(2, true);
            facesCount = this.file.readShort();
            for (i = _i = 0; 0 <= facesCount ? _i < facesCount : _i > facesCount; i = 0 <= facesCount ? ++_i : --_i) {
                this.faces.push(_({}).tap((function (_this) {
                    return function (face) {
                        var j, _j, _ref, _results;
                        face.mark = _this.file.readShort();
                        face.fontType = _this.file.readInt();
                        face.fontName = _this.file.readString();
                        face.fontFamilyName = _this.file.readString();
                        face.fontStyleName = _this.file.readString();
                        face.script = _this.file.readShort();
                        face.numberAxesVector = _this.file.readInt();
                        face.vector = [];
                        _results = [];
                        for (j = _j = 0, _ref = face.numberAxesVector; 0 <= _ref ? _j < _ref : _j > _ref; j = 0 <= _ref ? ++_j : --_j) {
                            _results.push(face.vector.push(_this.file.readInt()));
                        }
                        return _results;
                    };
                })(this)));
            }
            stylesCount = this.file.readShort();
            for (i = _j = 0; 0 <= stylesCount ? _j < stylesCount : _j > stylesCount; i = 0 <= stylesCount ? ++_j : --_j) {
                this.styles.push(_({}).tap((function (_this) {
                    return function (style) {
                        style.mark = _this.file.readShort();
                        style.faceMark = _this.file.readShort();
                        style.size = _this.file.readInt();
                        style.tracking = _this.file.readInt();
                        style.kerning = _this.file.readInt();
                        style.leading = _this.file.readInt();
                        style.baseShift = _this.file.readInt();
                        style.autoKern = _this.file.readBoolean();
                        _this.file.seek(1, true);
                        return style.rotate = _this.file.readBoolean();
                    };
                })(this)));
            }
            this.type = this.file.readShort();
            this.scalingFactor = this.file.readInt();
            this.characterCount = this.file.readInt();
            this.horzPlace = this.file.readInt();
            this.vertPlace = this.file.readInt();
            this.selectStart = this.file.readInt();
            this.selectEnd = this.file.readInt();
            linesCount = this.file.readShort();
            for (i = _k = 0; 0 <= linesCount ? _k < linesCount : _k > linesCount; i = 0 <= linesCount ? ++_k : --_k) {
                this.lines.push(_({}).tap(function (line) {
                    line.charCount = this.file.readInt();
                    line.orientation = this.file.readShort();
                    line.alignment = this.file.readShort();
                    line.actualChar = this.file.readShort();
                    return line.style = this.file.readShort();
                }));
            }
            this.color = this.file.readSpaceColor();
            return this.antialias = this.file.readBoolean();
        };

        return LegacyTypeTool;

    })(TypeTool);

}).call(this);