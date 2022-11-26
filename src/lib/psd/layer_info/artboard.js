import LayerInfo from "../layer_info";
import Descriptor from "../descriptor";

export default class Artboard extends LayerInfo {
    constructor() {
        return super(...arguments);
    }

    static shouldParse(key) {
        return key === "artb";
    }

    parse() {
        this.file.seek(4, true);
        return (this.data = new Descriptor(this.file).parse());
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
