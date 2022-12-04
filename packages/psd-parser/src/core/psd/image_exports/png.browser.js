export default {
    toBase64() {
        var canvas, context, i, imageData, pixel, pixelData, _i, _len, _ref;
        canvas = document.createElement("canvas");
        canvas.width = this.width();
        canvas.height = this.height();
        context = canvas.getContext("2d");
        imageData = context.getImageData(0, 0, this.width(), this.height());
        pixelData = imageData.data;
        _ref = this.pixelData;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            pixel = _ref[i];
            pixelData[i] = pixel;
        }
        context.putImageData(imageData, 0, 0);
        return canvas.toDataURL("image/png");
    },
    toPng() {
        var dataUrl, image;
        dataUrl = this.toBase64();
        image = new Image();
        image.width = this.width();
        image.height = this.height();
        image.src = dataUrl;
        return image;
    },
    // saveAsPng() {
    //     throw "Not available in the browser. Use toPng() instead.";
    // },
};
