// import fs from "fs";
import RSVP from "rsvp";
const PNG = require("pngjs").PNG;

export default {
    toPngSteam() {
        const png = new PNG({
            filterType: 4,
            width: this.width(),
            height: this.height(),
        });
        png.data = this.pixelData;
        return png;
    },
    saveAsPng(output) {
        if (process) {
            return new RSVP.Promise((resolve, reject) => {
                return this.toPngSteam()
                    .pack()
                    .pipe(require("fs").createWriteStream(output))
                    .on("finish", resolve)
                    .on("error", reject);
            });
        } else {
            throw "Not available in the browser. Use toPng() instead.";
        }
    },
};
