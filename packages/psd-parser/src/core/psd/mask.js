// Each layer/group in the PSD document can have a mask, which is
// represented by this class. The mask describes which parts of the
// layer are visible and which are hidden.
export default class Mask {
    constructor(file) {
        this.file = file;
        this.top = 0;
        this.right = 0;
        this.bottom = 0;
        this.left = 0;
    }

    parse() {
        // If there is no mask, then this section will have a size of zero
        // and we can move on to the next.
        // 数据大小：检查大小和标志以确定存在或不存在的内容。如果为零，则以下字段不存在
        this.size = this.file.readInt();
        if (this.size === 0) {
            return this;
        }
        const maskEnd = this.file.tell() + this.size;
        // First, we parse the coordinates of the mask.
        // 矩形封闭图层蒙版：顶部、左侧、底部、右侧
        this.top = this.file.readInt();
        this.left = this.file.readInt();
        this.bottom = this.file.readInt();
        this.right = this.file.readInt();
        // We can then easily derive the dimensions from the box coordinates.
        this.width = this.right - this.left;
        this.height = this.bottom - this.top;
        // Each mask defines a couple of flags that are used as extra metadata.
        this.relative = (this.flags & 0x01) > 0;
        this.disabled = (this.flags & (0x01 << 1)) > 0;
        this.invert = (this.flags & (0x01 << 2)) > 0;
        // 默认颜色。 0 或 255
        this.defaultColor = this.file.readByte();
        /**
         * 位 0 = 相对于图层的位置
         * 位 1 = 图层蒙版禁用
         * 位 2 = 混合时反转图层蒙版（已过时）
         * 位 2 = 矢量掩码密度，1 字节
         * 位 3 = 矢量掩码羽化，8 字节，双精度
         */
        this.flags = this.file.readByte();
        this.file.seek(maskEnd);
        return this;
    }

    export() {
        if (this.size === 0) {
            return undefined;
        }
        return {
            top: this.top + 1,
            left: this.left + 1,
            bottom: this.bottom - 1,
            right: this.right - 1,
            width: this.width - 2,
            height: this.height - 2,
            defaultColor: this.defaultColor,
            relative: this.relative,
            disabled: this.disabled,
            invert: this.invert,
        };
    }
}
