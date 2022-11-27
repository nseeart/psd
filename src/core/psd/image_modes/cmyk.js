import Color from "../color";

export default {
    setCmykChannels() {
        this.channelsInfo = [
            {
                id: 0,
            },
            {
                id: 1,
            },
            {
                id: 2,
            },
            {
                id: 3,
            },
        ];
        if (this.channels() === 5) {
            return this.channelsInfo.push({
                id: -1,
            });
        }
    },
    combineCmykChannel() {
        var a,
            b,
            c,
            chan,
            cmykChannels,
            g,
            i,
            index,
            k,
            m,
            r,
            val,
            y,
            _i,
            _j,
            _len,
            _ref,
            _ref1,
            _results;
        cmykChannels = this.channelsInfo
            .map(function (ch) {
                return ch.id;
            })
            .filter(function (ch) {
                return ch >= -1;
            });
        _results = [];
        for (
            i = _i = 0, _ref = this.numPixels;
            0 <= _ref ? _i < _ref : _i > _ref;
            i = 0 <= _ref ? ++_i : --_i
        ) {
            c = m = y = k = 0;
            a = 255;
            for (
                index = _j = 0, _len = cmykChannels.length;
                _j < _len;
                index = ++_j
            ) {
                chan = cmykChannels[index];
                val = this.channelData[i + this.channelLength * index];
                switch (chan) {
                    case -1:
                        a = val;
                        break;
                    case 0:
                        c = val;
                        break;
                    case 1:
                        m = val;
                        break;
                    case 2:
                        y = val;
                        break;
                    case 3:
                        k = val;
                }
            }
            (_ref1 = Color.cmykToRgb(255 - c, 255 - m, 255 - y, 255 - k)),
                (r = _ref1[0]),
                (g = _ref1[1]),
                (b = _ref1[2]);
            _results.push(this.pixelData.push(r, g, b, a));
        }
        return _results;
    },
};
