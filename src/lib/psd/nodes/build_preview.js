export default {
    toPng() {
        return this.layer.image.toPng();
    },
    saveAsPng(output) {
        return this.layer.image.saveAsPng(output);
    },
};
