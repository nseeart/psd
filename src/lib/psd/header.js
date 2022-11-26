const MODES = [
    "Bitmap",
    "GrayScale",
    "IndexedColor",
    "RGBColor",
    "CMYKColor",
    "HSLColor",
    "HSBColor",
    "Multichannel",
    "Duotone",
    "LabColor",
    "Gray16",
    "RGB48",
    "Lab48",
    "CMYK64",
    "DeepMultichannel",
    "Duotone16",
];

export default class Header {
    constructor(file) {
        this.sig = null;
        this.version = null;
        this.channels = null;
        this.rows = this.height = null;
        this.cols = this.width = null;
        this.depth = null;
        this.mode = null;
        this.file = file;
    }

    parse() {
        this.sig = this.file.readString(4);
        if (this.sig !== "8BPS") {
            throw new Error(
                "Invalid file signature detected. Got: " +
                    this.sig +
                    ". Expected 8BPS."
            );
        }
        this.version = this.file.readUShort();
        this.file.seek(6, true);
        this.channels = this.file.readUShort();
        this.rows = this.height = this.file.readUInt();
        this.cols = this.width = this.file.readUInt();
        this.depth = this.file.readUShort();
        this.mode = this.file.readUShort();
        let colorDataLen = this.file.readUInt();
        return this.file.seek(colorDataLen, true);
    }

    modeName() {
        return MODES[this.mode];
    }
    export() {
        const data = {};
        const _ref = [
            "sig",
            "version",
            "channels",
            "rows",
            "cols",
            "depth",
            "mode",
        ];
        for (let _i = 0, _len = _ref.length; _i < _len; _i++) {
            const key = _ref[_i];
            data[key] = this[key];
        }
        return data;
    }
}
