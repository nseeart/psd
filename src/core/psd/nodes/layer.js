import Node from "../node";
import { merge } from "lodash-es";

export default class Layer extends Node {
    constructor() {
        return super(...arguments);
    }

    type = "layer";

    isEmpty() {
        return this.width === 0 || this.height === 0;
    }

    export() {
        const _ref = this.get("typeTool");
        const text = _ref && _ref.export ? _ref.export() : void 0;
        const _vectorMask = this.get("vectorMask");
        console.log("this.name", this.name);
        if (_vectorMask) {
            // _vectorMask.parse();
            console.log("_vectorMask", this);
            console.log("_vectorMask.export()", _vectorMask.export());
        }
        // const vectorMask =
        //     _vectorMask && _vectorMask.export ? vectorMask.export() : void 0;
        // console.log("vectorMask--", _vectorMask && _vectorMask.export());
        return merge(super.export(), {
            type: "layer",
            mask: this.layer.mask.export(),
            text,
            image: {},
        });
    }
}
