import LayerInfo from "../layer_info";

import Descriptor from "../descriptor";

export default class ObjectEffects extends LayerInfo {
    constructor() {
        return super(...arguments);
    }

    static shouldParse(key) {
        return key === "lfx2";
    }

    parse() {
        this.file.seek(8, true);
        return (this.data = new Descriptor(this.file).parse());
    }
}
