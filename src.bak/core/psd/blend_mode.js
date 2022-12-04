const BLEND_MODES = {
    norm: "normal",
    dark: "darken",
    lite: "lighten",
    hue: "hue",
    sat: "saturation",
    colr: "color",
    lum: "luminosity",
    mul: "multiply",
    scrn: "screen",
    diss: "dissolve",
    over: "overlay",
    hLit: "hard_light",
    sLit: "soft_light",
    diff: "difference",
    smud: "exclusion",
    div: "color_dodge",
    idiv: "color_burn",
    lbrn: "linear_burn",
    lddg: "linear_dodge",
    vLit: "vivid_light",
    lLit: "linear_light",
    pLit: "pin_light",
    hMix: "hard_mix",
    pass: "passthru",
    dkCl: "darker_color",
    lgCl: "lighter_color",
    fsub: "subtract",
    fdiv: "divide",
};

class BlendMode {
    constructor(file) {
        this.file = file;
        this.signature = null;
        this.blendKey = null;
        this.opacity = null;
        this.clipping = null;
        this.clipped = null;
        this.flags = null;
        this.mode = null;
        this.visible = null;
    }

    parse() {
        this.signature = this.file.readString(4);
        // this.file.seek(4, true);
        this.blendKey = this.file.readString(4).trim();
        // 不透明度: 0 = 透明 ... 255 = 不透明
        this.opacity = this.file.readByte();
        // 剪裁：0 = 基础，1 = 非基础
        this.clipping = this.file.readByte();
        /**
         * 位 0 = 透明度保护；
         * 位 1 = 可见；
         * 位 2 = 已过时；
         * 位 3 = 1 对于 Photoshop 5.0 及更高版本，表明位 4 是否有有用的信息；
         * 位 4 = 与文档外观无关的像素数据
         */
        this.flags = this.file.readByte();
        this.mode = BLEND_MODES[this.blendKey];
        this.clipped = this.clipping === 1;
        this.visible = !((this.flags & (0x01 << 1)) > 0);
        return this.file.seek(1, true);
    }

    opacityPercentage() {
        return (this.opacity * 100) / 255;
    }

    get blendingMode() {
        return this.mode;
    }
    set blendingMode(val) {
        this.mode = val;
    }
}

export default BlendMode;
