(function () {
    var PathRecord, _;

    _ = require('lodash');

    module.exports = PathRecord = (function () {
        function PathRecord(_at_file) {
            this.file = _at_file;
            this.recordType = null;
        }

        PathRecord.prototype.parse = function () {
            this.recordType = this.file.readShort();
            switch (this.recordType) {
                case 0:
                case 3:
                    return this._readPathRecord();
                case 1:
                case 2:
                case 4:
                case 5:
                    return this._readBezierPoint();
                case 7:
                    return this._readClipboardRecord();
                case 8:
                    return this._readInitialFill();
                default:
                    return this.file.seek(24, true);
            }
        };

        PathRecord.prototype["export"] = function () {
            return _.merge({
                recordType: this.recordType
            }, (function () {
                var _ref;
                switch (this.recordType) {
                    case 0:
                    case 3:
                        return {
                            numPoints: this.numPoints
                        };
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return {
                            linked: this.linked,
                            closed: ((_ref = this.recordType) === 1 || _ref === 2),
                            preceding: {
                                vert: this.precedingVert,
                                horiz: this.precedingHoriz
                            },
                            anchor: {
                                vert: this.anchorVert,
                                horiz: this.anchorHoriz
                            },
                            leaving: {
                                vert: this.leavingVert,
                                horiz: this.leavingHoriz
                            }
                        };
                    case 7:
                        return {
                            clipboard: {
                                top: this.clipboardTop,
                                left: this.clipboardLeft,
                                bottom: this.clipboardBottom,
                                right: this.clipboardRight,
                                resolution: this.clipboardResolution
                            }
                        };
                    case 8:
                        return {
                            initialFill: this.initialFill
                        };
                    default:
                        return {};
                }
            }).call(this));
        };

        PathRecord.prototype.isBezierPoint = function () {
            var _ref;
            return (_ref = this.recordType) === 1 || _ref === 2 || _ref === 4 || _ref === 5;
        };

        PathRecord.prototype._readPathRecord = function () {
            this.numPoints = this.file.readShort();
            return this.file.seek(22, true);
        };

        PathRecord.prototype._readBezierPoint = function () {
            var _ref;
            this.linked = (_ref = this.recordType) === 1 || _ref === 4;
            this.precedingVert = this.file.readPathNumber();
            this.precedingHoriz = this.file.readPathNumber();
            this.anchorVert = this.file.readPathNumber();
            this.anchorHoriz = this.file.readPathNumber();
            this.leavingVert = this.file.readPathNumber();
            return this.leavingHoriz = this.file.readPathNumber();
        };

        PathRecord.prototype._readClipboardRecord = function () {
            this.clipboardTop = this.file.readPathNumber();
            this.clipboardLeft = this.file.readPathNumber();
            this.clipboardBottom = this.file.readPathNumber();
            this.clipboardRight = this.file.readPathNumber();
            this.clipboardResolution = this.file.readPathNumber();
            return this.file.seek(4, true);
        };

        PathRecord.prototype._readInitialFill = function () {
            this.initialFill = this.file.readShort();
            return this.file.seek(22, true);
        };

        return PathRecord;

    })();

}).call(this);