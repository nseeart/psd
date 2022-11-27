export default {
    parseBlendingRanges() {
        var i, length, numChannels, _i, _results;
        length = this.file.readInt();
        this.blendingRanges.grey = {
            source: {
                black: [this.file.readByte(), this.file.readByte()],
                white: [this.file.readByte(), this.file.readByte()],
            },
            dest: {
                black: [this.file.readByte(), this.file.readByte()],
                white: [this.file.readByte(), this.file.readByte()],
            },
        };
        numChannels = (length - 8) / 8;
        this.blendingRanges.channels = [];
        _results = [];
        for (
            i = _i = 0;
            0 <= numChannels ? _i < numChannels : _i > numChannels;
            i = 0 <= numChannels ? ++_i : --_i
        ) {
            _results.push(
                this.blendingRanges.channels.push({
                    source: {
                        black: [this.file.readByte(), this.file.readByte()],
                        white: [this.file.readByte(), this.file.readByte()],
                    },
                    dest: {
                        black: [this.file.readByte(), this.file.readByte()],
                        white: [this.file.readByte(), this.file.readByte()],
                    },
                })
            );
        }
        return _results;
    },
};
