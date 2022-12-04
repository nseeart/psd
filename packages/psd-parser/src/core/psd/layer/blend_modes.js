import BlendMode from "../blend_mode";

export default {
    parseBlendModes() {
        this.blendMode = new BlendMode(this.file);
        this.blendMode.parse();
        this.opacity = this.blendMode.opacity;
        this.visible = this.blendMode.visible;
        return (this.clipped = this.blendMode.clipped);
    },
    hidden() {
        return !this.visible;
    },
    blendingMode() {
        return this.blendMode.mode;
    },
};
