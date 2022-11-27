import Node from "../node.js";
const _ = require("lodash");

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

        return _.merge(super.export(), {
            type: "layer",
            mask: this.layer.mask.export(),
            text,
            image: {},
        });
    }
}
