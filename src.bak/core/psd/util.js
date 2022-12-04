export function pad2(i) {
    return (i + 1) & ~0x01;
}

export function pad4(i) {
    return ((i + 4) & ~0x03) - 1;
}
export function getUnicodeCharacter(cp) {
    var first, second;
    if ((cp >= 0 && cp <= 0xd7ff) || (cp >= 0xe000 && cp <= 0xffff)) {
        return String.fromCharCode(cp);
    } else if (cp >= 0x10000 && cp <= 0x10ffff) {
        cp -= 0x10000;
        first = ((0xffc00 & cp) >> 10) + 0xd800;
        second = (0x3ff & cp) + 0xdc00;
        return String.fromCharCode(first) + String.fromCharCode(second);
    }
}
export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

export function includes(self, obj) {
    for (let key in obj) {
        self.prototype[key] = obj[key];
    }
    return self;
}
