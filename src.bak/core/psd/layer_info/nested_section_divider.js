import LayerInfo from "../layer_info";

export default class NestedSectionDivider extends LayerInfo {
    static shouldParse(key) {
        return key === "lsdk";
    }

    constructor(layer, length) {
        super(layer, length);
        this.isFolder = false;
        this.isHidden = false;
    }

    parse() {
        const code = this.file.readInt();
        switch (code) {
            case 1:
            case 2:
                return (this.isFolder = true);
            case 3:
                return (this.isHidden = true);
        }
    }
}
