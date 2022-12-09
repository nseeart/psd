import Descriptor from "../descriptor";

export default class LayerComps {
    id = 1065;
    name = "LayerComps";

    constructor(resource) {
        this.resource = resource;
        this.file = this.resource.file;
    }

    parse() {
        this.file.seek(4, true);
        return (this.data = new Descriptor(this.file).parse());
    }

    names() {
        return this.data.list.map((comp) => {
            return comp["Nm  "];
        });
    }

    export() {
        return {
            id: this.id,
            name: this.name,
            data: this.data.list.map((comp) => {
                return {
                    id: comp.compID,
                    name: comp["Nm  "],
                    capturedInfo: comp.capturedInfo,
                };
            }),
        };
    }

    static visibilityCaptured(comp) {
        return comp.capturedInfo & (parseInt("001", 2) > 0);
    }
    static positionCaptured(comp) {
        return comp.positionCaptured & (parseInt("010", 2) > 0);
    }
    static appearanceCaptured(comp) {
        return comp.appearanceCaptured & (parseInt("100", 2) > 0);
    }
}
