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

    isVector() {
        return !!this.get("vectorMask");
    }

    getIsVectorRect(layerInfo) {
        if (this.isVector()) {
            return {
                ...layerInfo,
                top: layerInfo.top + 1,
                left: layerInfo.left + 1,
                right: layerInfo.right - 1,
                bottom: layerInfo.bottom - 1,
                width: layerInfo.right - layerInfo.left - 2,
                height: layerInfo.bottom - layerInfo.top - 2,
            };
        }
        return layerInfo;
    }

    export() {
        const _ref = this.get("typeTool");
        const text = _ref && _ref.export ? _ref.export() : void 0;
        const _vectorMask = this.get("vectorMask");
        // if (_vectorMask) {
        //     console.log("_vectorMask.export()", _vectorMask.export());
        // }
        const layerInfo = this.getIsVectorRect(super.export());
        return merge(layerInfo, {
            type: "layer",
            mask: this.layer.mask.export(),
            text,
            image: {},
        });
    }
}
