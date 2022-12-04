import LayerInfo from "../layer_info";

export default class BlendInteriorElements extends LayerInfo {
    constructor() {
        return super(...arguments);
    }

    static shouldParse(key) {
        return key === "infx";
    }

    parse() {
        this.enabled = this.file.readBoolean();
        return this.file.seek(3, true);
    }
}
