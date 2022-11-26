(function () {
    module.exports = {
        setRgbChannels: function () {
            this.channelsInfo = [
                {
                    id: 0
                }, {
                    id: 1
                }, {
                    id: 2
                }
            ];
            if (this.channels() === 4) {
                return this.channelsInfo.push({
                    id: -1
                });
            }
        },
        combineRgbChannel: function () {
            var a, b, chan, g, i, index, r, rgbChannels, val, _i, _j, _len, _ref, _results;
            rgbChannels = this.channelsInfo.map(function (ch) {
                return ch.id;
            }).filter(function (ch) {
                return ch >= -1;
            });
            _results = [];
            for (i = _i = 0, _ref = this.numPixels; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
                r = g = b = 0;
                a = 255;
                for (index = _j = 0, _len = rgbChannels.length; _j < _len; index = ++_j) {
                    chan = rgbChannels[index];
                    val = this.channelData[i + (this.channelLength * index)];
                    switch (chan) {
                        case -1:
                            a = val;
                            break;
                        case 0:
                            r = val;
                            break;
                        case 1:
                            g = val;
                            break;
                        case 2:
                            b = val;
                    }
                }
                _results.push(this.pixelData.push(r, g, b, a));
            }
            return _results;
        }
    };

}).call(this);