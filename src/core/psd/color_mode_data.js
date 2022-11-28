const colorModeMap = new Map([
    [0, "Bitmap"],
    [1, "Grayscale"],
    [2, "Indexed"],
    [3, "RGB"],
    [4, "CMYK"],
    [7, "Multichannel"],
    [8, "Duotone"],
    [9, "Lab"],
]);

export default class ColorModeData {
    constructor(file) {
        this.file = file;
        this.colorDataLen = null;
        this.colorMode = null;
    }

    parse() {
        // 以下颜色数据的长度。
        const colorDataLen = this.file.readUInt();
        // this.colorMode = colorModeMap.get(colorDataLen);
        // 颜色模式数据部分
        return this.file.seek(colorDataLen, true);
    }
}
