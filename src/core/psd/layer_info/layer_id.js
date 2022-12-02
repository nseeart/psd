import LayerInfo from "../layer_info";

export default class LayerId extends LayerInfo {
    constructor(layer, length) {
        super(layer, length);
    }

    static shouldParse(key) {
        return key === "lyid";
    }

    parse() {
        debugger;
        return (this.id = this.file.readInt());
    }
}
