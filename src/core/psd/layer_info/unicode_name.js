import LayerInfo from "../layer_info";

class UnicodeName extends LayerInfo {
    static shouldParse(key) {
        return key === "luni";
    }

    constructor(...args) {
        super(...args);
    }

    parse() {
        var pos;
        pos = this.file.tell();
        this.data = this.file.readUnicodeString();
        this.file.seek(pos + this.length);
        return this;
    }
}

export default UnicodeName;
