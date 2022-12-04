export default class ColorModeData {
    constructor(file) {
        this.file = file;
        this.colorDataLen = null;
        this.colorMode = null;
    }

    parse() {
        // 以下颜色数据的长度。
        const colorDataLen = this.file.readUInt();
        // 颜色模式数据部分
        return this.file.seek(colorDataLen, true);
    }
}
