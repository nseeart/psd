export default {
    parseByteCounts() {
        var i, _i, _ref, _results;
        _results = [];
        for (
            i = _i = 0, _ref = this.height();
            0 <= _ref ? _i < _ref : _i > _ref;
            i = 0 <= _ref ? ++_i : --_i
        ) {
            _results.push(this.file.readShort());
        }
        return _results;
    },
    parseChannelData() {
        this.lineIndex = 0;
        return this.decodeRLEChannel();
    },
};
