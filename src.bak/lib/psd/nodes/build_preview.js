(function () {
    module.exports = {
        toPng: function () {
            return this.layer.image.toPng();
        },
        saveAsPng: function (output) {
            return this.layer.image.saveAsPng(output);
        }
    };

}).call(this);