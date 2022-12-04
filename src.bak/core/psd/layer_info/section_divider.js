import LayerInfo from "../layer_info";

const SECTION_DIVIDER_TYPES = [
    "other",
    "open folder",
    "closed folder",
    "bounding section divider",
];

export default class NestedSectionDivider extends LayerInfo {
    static shouldParse(key) {
        return key === "lsct";
    }

    constructor(layer, length) {
        super(layer, length);
        this.isFolder = false;
        this.isHidden = false;
        this.layerType = null;
        this.blendMode = null;
        this.subType = null;
    }

    parse() {
        const code = this.file.readInt();
        this.layerType = SECTION_DIVIDER_TYPES[code];
        switch (code) {
            case 1:
            case 2:
                this.isFolder = true;
                break;
            case 3:
                this.isHidden = true;
        }
        if (!(this.length >= 12)) {
            return;
        }
        this.file.seek(4, true);
        this.blendMode = this.file.readString(4);
        if (!(this.length >= 16)) {
            return;
        }
        return (this.subType =
            this.file.readInt() === 0 ? "normal" : "scene group");
    }
}
