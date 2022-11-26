export default {
    parsePositionAndChannels() {
        var i, id, length, _i, _ref, _results;
        this.top = this.file.readInt();
        this.left = this.file.readInt();
        this.bottom = this.file.readInt();
        this.right = this.file.readInt();
        this.channels = this.file.readShort();
        this.rows = this.height = this.bottom - this.top;
        this.cols = this.width = this.right - this.left;
        _results = [];
        for (
            i = _i = 0, _ref = this.channels;
            0 <= _ref ? _i < _ref : _i > _ref;
            i = 0 <= _ref ? ++_i : --_i
        ) {
            id = this.file.readShort();
            length = this.file.readInt();
            _results.push(
                this.channelsInfo.push({
                    id: id,
                    length: length,
                })
            );
        }
        return _results;
    },
};
