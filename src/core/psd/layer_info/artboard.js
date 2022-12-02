import LayerInfo from "../layer_info";
import Descriptor from "../descriptor";

class Artboard extends LayerInfo {
    constructor() {
        console.log("...arguments", ...arguments);
        return super(...arguments);
    }

    static shouldParse(key) {
        // 关键是“artb”或“artd”或“abdd”。数据如下：
        return "artb" === key;
        // return ["artb", "artd", "abdd"].includes(key);
    }

    parse() {
        this.file.seek(4, true);
        this.data = new Descriptor(this.file);
        console.log("this.data", this.data.parse());
        return this.data.parse();
    }

    export() {
        return {
            coords: {
                left: this.data.artboardRect["Left"],
                top: this.data.artboardRect["Top "],
                right: this.data.artboardRect["Rght"],
                bottom: this.data.artboardRect["Btom"],
            },
        };
    }
}

// Artboard.prototype.parse = function () {
//     this.file.seek(4, true);
//     this.data = new Descriptor(this.file);
//     console.log("this.data", this.data.parse());
//     return this.data.parse();
// };

export default Artboard;
