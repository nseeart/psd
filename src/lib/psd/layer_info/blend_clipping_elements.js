import LayerInfo from "../layer_info";

export default class BlendClippingElements extends LayerInfo {
    constructor() {
        return super(...arguments);
    }

    static shouldParse(key) {
        return key === "clbl";
    }

    parse() {
        this.enabled = this.file.readBoolean();
        return this.file.seek(3, true);
    }
}
