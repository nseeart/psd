const fs = require("fs");

const PNG = require("pngjs").PNG;

const RSVP = require("rsvp");

export default {
    toPng() {
        var png;
        png = new PNG({
            filterType: 4,
            width: this.width(),
            height: this.height(),
        });
        png.data = this.pixelData;
        return png;
    },
    saveAsPng(output) {
        return new RSVP.Promise(
            (function (_this) {
                return function (resolve, reject) {
                    return _this
                        .toPng()
                        .pack()
                        .pipe(fs.createWriteStream(output))
                        .on("finish", resolve);
                };
            })(this)
        );
    },
};
