import LayerInfo from "../layer_info";
import Descriptor from "../descriptor";

export default class VectorStroke extends LayerInfo {
    constructor() {
        return super(...arguments);
    }

    static shouldParse(key) {
        return key === "vstk";
    }

    parse() {
        this.file.seek(4, true);
        return (this.data = new Descriptor(this.file).parse());
    }
}
