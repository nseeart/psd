import LayerInfo from "../layer_info";

export default class LayerNameSource extends LayerInfo {
    constructor() {
        return super(...arguments);
    }

    static shouldParse(key) {
        return key === "lnsr";
    }

    parse() {
        return (this.id = this.file.readString(4));
    }
}
