import LayerInfo from "../layer_info";
import Descriptor from "../descriptor";

export default class VectorStrokeContent extends LayerInfo {
    constructor() {
        super(...arguments);
        this.r = this.g = this.b = 0;
        this.dataKey = null;
        this.version = null;
    }

    static shouldParse(key) {
        return key === "vscg";
    }

    parse() {
        this.dataKey = this.file.readString(4);
        this.version = this.file.readInt();
        this.data = new Descriptor(this.file).parse();
        this.r = Math.round(this.colorData()["Rd  "]);
        this.g = Math.round(this.colorData()["Grn "]);
        return (this.b = Math.round(this.colorData()["Bl  "]));
    }

    colorData() {
        return this.data["Clr "];
    }

    color() {
        return [this.r, this.g, this.b];
    }
}
