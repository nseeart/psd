import LayerInfo from "../layer_info";

import Descriptor from "../descriptor";

export default class VectorOrigination extends LayerInfo {
    static shouldParse(key) {
        return key === "vogk";
    }
    constructor() {
        return super(...arguments);
    }

    parse() {
        this.file.seek(8, true);
        return (this.data = new Descriptor(this.file).parse());
    }
}
