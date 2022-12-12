import Node from "../node";
import Group from "./group";
import Layer from "./layer";
import { last } from "lodash-es";

class Root extends Node {
    constructor(psd) {
        super(Root.layerForPsd(psd));
        this.psd = psd;
        this.buildHeirarchy();
    }

    type = "root";

    depth() {
        return [this.width, this.height];
    }

    depth() {
        return 0;
    }

    opacity() {
        return 255;
    }

    fillOpacity() {
        return 255;
    }

    export() {
        const _ref =
            (this.psd.resources.resource &&
                this.psd.resources.resource("layerComps")) ||
            null;
        const layerComps = _ref && _ref.export ? _ref.export() : void 0 || [];

        return {
            children: this._children.map((c) => c.export()),
            document: {
                width: this.width,
                height: this.height,
                resources: {
                    layerComps,
                    guides: [],
                    slices: [],
                },
            },
        };
    }

    static layerForPsd(psd) {
        const layer = {};
        const _ref = Node.PROPERTIES;
        const _len = _ref.length;
        for (let _i = 0; _i < _len; _i++) {
            const prop = _ref[_i];
            layer[prop] = null;
        }
        layer.top = 0;
        layer.left = 0;
        layer.right = psd.header.width;
        layer.bottom = psd.header.height;
        return layer;
    }
}

Root.prototype.buildHeirarchy = function () {
    let currentGroup = this;
    const parseStack = [];
    const _ref = this.psd.layers;
    const _len = _ref.length;
    for (let _i = 0; _i < _len; _i++) {
        const layer = _ref[_i];
        if (layer.isFolder()) {
            parseStack.push(currentGroup);
            currentGroup = new Group(layer, last(parseStack));
        } else if (layer.isFolderEnd()) {
            const parent = parseStack.pop();
            parent.children().push(currentGroup);
            currentGroup = parent;
        } else {
            currentGroup.children().push(new Layer(layer, currentGroup));
        }
    }
    return this.updateDimensions();
};

export default Root;
