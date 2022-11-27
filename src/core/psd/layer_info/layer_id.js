import LayerInfo from "../layer_info";

export default class LayerId extends LayerInfo {
    constructor() {
        return super(...arguments);
    }

    static shouldParse(key) {
        return key === "lyid";
    }

    parse() {
        return (this.id = this.file.readInt());
    }
}
