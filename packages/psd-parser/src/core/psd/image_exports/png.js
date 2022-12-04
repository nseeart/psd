import { createWriteStream } from "fs";
import RSVP from "rsvp";
const PNG = require("pngjs").PNG;

export default {
    toPng() {
        const png = new PNG({
            filterType: 4,
            width: this.width(),
            height: this.height(),
        });
        png.data = this.pixelData;
        return png;
    },
    saveAsPng(output) {
        return new RSVP.Promise((resolve, reject) => {
            return this.toPng()
                .pack()
                .pipe(createWriteStream(output))
                .on("finish", resolve)
                .on("error", reject);
        });
    },
};
