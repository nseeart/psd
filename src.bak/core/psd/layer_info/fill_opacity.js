import LayerInfo from "../layer_info";

export default class FillOpacity extends LayerInfo {
    constructor() {
        return super(...arguments);
    }

    static shouldParse(key) {
        return key === "iOpa";
    }

    parse() {
        return (this.value = this.file.readByte());
    }
}
