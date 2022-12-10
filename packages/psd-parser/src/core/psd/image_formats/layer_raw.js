export default {
    parseRaw() {
        let i, _i, _ref, _ref1;
        for (
            i = _i = _ref = this.chanPos,
                _ref1 = this.chanPos + this.chan.length - 2;
            _ref <= _ref1 ? _i < _ref1 : _i > _ref1;
            i = _ref <= _ref1 ? ++_i : --_i
        ) {
            this.channelData[i] = this.file.readByte();
        }
        return (this.chanPos += this.chan.length - 2);
    },
};
