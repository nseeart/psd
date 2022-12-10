export default {
    setGreyscaleChannels() {
        this.channelsInfo = [
            {
                id: 0,
            },
        ];
        if (this.channels() === 2) {
            return this.channelsInfo.push({
                id: -1,
            });
        }
    },
    combineGreyscaleChannel() {
        let i, _i;
        const _results = [];
        const _ref = this.numPixels;
        for (
            i = _i = 0;
            0 <= _ref ? _i < _ref : _i > _ref;
            i = 0 <= _ref ? ++_i : --_i
        ) {
            const grey = this.channelData[i];
            const alpha =
                this.channels() === 2
                    ? this.channelData[this.channelLength + i]
                    : 255;
            _results.push(this.pixelData.push(grey, grey, grey, alpha));
        }
        return _results;
    },
};
