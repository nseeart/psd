export default {
    toBase64() {
        const canvas = document.createElement("canvas");
        canvas.width = this.width();
        canvas.height = this.height();
        const context = canvas.getContext("2d");
        const imageData = context.getImageData(
            0,
            0,
            this.width(),
            this.height()
        );
        const pixelData = imageData.data;
        const _ref = this.pixelData;
        const _len = _ref.length;
        let i, _i;
        for (i = _i = 0; _i < _len; i = ++_i) {
            pixelData[i] = _ref[i];
        }
        context.putImageData(imageData, 0, 0);
        return canvas.toDataURL("image/png");
    },
    toPng() {
        const image = new Image();
        image.width = this.width();
        image.height = this.height();
        image.src = this.toBase64();
        return image;
    },
    // saveAsPng() {
    //     throw "Not available in the browser. Use toPng() instead.";
    // },
};
