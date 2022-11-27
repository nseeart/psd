import Descriptor from "../descriptor";
import LayerInfo from "../layer_info";

class SolidColor extends LayerInfo {
    static shouldParse(key) {
        return key === "SoCo";
    }
    constructor(layer, length) {
        super(layer, length);
        this.r = this.g = this.b = 0;
    }

    parse() {
        this.file.seek(4, true);
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

export default SolidColor;
