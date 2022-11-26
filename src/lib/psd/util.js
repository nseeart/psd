(function () {
    module.exports = {
        pad2: function (i) {
            return (i + 1) & ~0x01;
        },
        pad4: function (i) {
            return ((i + 4) & ~0x03) - 1;
        },
        getUnicodeCharacter: function (cp) {
            var first, second;
            if ((cp >= 0 && cp <= 0xd7ff) || (cp >= 0xe000 && cp <= 0xffff)) {
                return String.fromCharCode(cp);
            } else if (cp >= 0x10000 && cp <= 0x10ffff) {
                cp -= 0x10000;
                first = ((0xffc00 & cp) >> 10) + 0xd800;
                second = (0x3ff & cp) + 0xdc00;
                return String.fromCharCode(first) + String.fromCharCode(second);
            }
        },
        clamp: function (num, min, max) {
            return Math.min(Math.max(num, min), max);
        },
    };
}.call(this));
