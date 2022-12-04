import jspack from "../../libs/jspack";
// import { Buffer } from "safer-buffer";
const iconv = require("iconv-lite");
const Buffer = require("safer-buffer").Buffer;

const FORMATS = {
    Int: {
        code: ">i",
        length: 4,
    },
    UInt: {
        code: ">I",
        length: 4,
    },
    Short: {
        code: ">h",
        length: 2,
    },
    UShort: {
        code: ">H",
        length: 2,
    },
    Float: {
        code: ">f",
        length: 4,
    },
    Double: {
        code: ">d",
        length: 8,
    },
    LongLong: {
        code: ">q",
        length: 8,
    },
};

class File {
    pos = 0;

    constructor(data) {
        this.data = data;
    }

    tell() {
        return this.pos;
    }

    read(length) {
        let i, _i;
        const _results = [];
        for (
            i = _i = 0;
            0 <= length ? _i < length : _i > length;
            i = 0 <= length ? ++_i : --_i
        ) {
            _results.push(this.data[this.pos++]);
        }
        return _results;
    }

    readf(format, len) {
        if (len == null) {
            len = null;
        }
        return jspack.Unpack(
            format,
            this.read(len || jspack.CalcLength(format))
        );
    }

    seek(amt, rel) {
        if (rel == null) {
            rel = false;
        }
        if (rel) {
            return (this.pos += amt);
        } else {
            return (this.pos = amt);
        }
    }

    readString(length) {
        return String.fromCharCode
            .apply(null, this.read(length))
            .replace(/\u0000/g, "");
    }

    readUnicodeString(length) {
        if (length == null) {
            length = null;
        }
        length || (length = this.readInt());

        return iconv
            .decode(new Buffer.from(this.read(length * 2)), "utf-16be")
            .replace(/\u0000/g, "");
    }

    readByte() {
        return this.read(1)[0];
    }

    readBoolean() {
        return this.readByte() !== 0;
    }

    readSpaceColor() {
        let colorComponent, i, _i;
        let colorSpace = this.readShort();
        for (i = _i = 0; _i < 4; i = ++_i) {
            colorComponent = this.readShort() >> 8;
        }
        return {
            colorSpace,
            components: colorComponent,
        };
    }

    readPathNumber() {
        const a = this.readByte();
        const arr = this.read(3);
        const b1 = arr[0] << 16;
        const b2 = arr[1] << 8;
        const b3 = arr[2];
        const b = b1 | b2 | b3;
        return parseFloat(a, 10) + parseFloat(b / Math.pow(2, 24), 10);
    }
}

const _fn = (format, info) => {
    return (File.prototype["read" + format] = function () {
        return this.readf(info.code, info.length)[0];
    });
};

for (let format in FORMATS) {
    if (!FORMATS.hasOwnProperty(format)) continue;
    const info = FORMATS[format];
    _fn(format, info);
}

export default File;
