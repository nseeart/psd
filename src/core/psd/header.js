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
        // 签名：始终等于 '8BPS' 。如果签名与此值不匹配，请不要尝试读取文件。
        this.sig = this.file.readString(4);
        if (this.sig !== "8BPS") {
            throw new Error(
                "Invalid file signature detected. Got: " +
                    this.sig +
                    ". Expected 8BPS."
            );
        }
        // 版本：始终等于 1。如果版本与此值不匹配，请不要尝试读取文件。 （**PSB** 版本为 2。）
        this.version = this.file.readUShort();
        // 保留：必须为零。
        this.file.seek(6, true);
        // 图像中的通道数，包括任何 alpha 通道。支持的范围是 1 到 56。
        this.channels = this.file.readUShort();
        // 图像的高度（以像素为单位）。支持的范围是 1 到 30,000。 （**PSB** 最大值为 300,000。）
        this.rows = this.height = this.file.readUInt();
        // 图像的宽度（以像素为单位）。支持的范围是 1 到 30,000。 （*PSB** 最多 300,000）
        this.cols = this.width = this.file.readUInt();
        // 深度：每个通道的位数。支持的值为 1、8、16 和 32。
        this.depth = this.file.readUShort();
        // 文件的颜色模式。支持的值为：Bitmap = 0; Grayscale = 1; Indexed = 2; RGB = 3; CMYK = 4; Multichannel = 7; Duotone = 8; Lab = 9.
        this.mode = this.file.readUShort();
        // 以下颜色数据的长度。
        let colorDataLen = this.file.readUInt();
        // 颜色模式数据部分
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
