import ancestry from "./nodes/ancestry";
import search from "./nodes/search";
import buildPreview from "./nodes/build_preview";
import Module from "./module";

class Node {
    static includes = Module.includes;
    static PROPERTIES = [
        "name",
        "left",
        "right",
        "top",
        "bottom",
        "height",
        "width",
    ];
    type = "node";
    constructor(layer, parent) {
        this.layer = layer;
        this.parent = parent != null ? parent : null;
        this.layer.node = this;
        this._children = [];
        this.name = this.layer.name;
        this.forceVisible = null;
        this.coords = {
            top: this.layer.top,
            bottom: this.layer.bottom,
            left: this.layer.left,
            right: this.layer.right,
        };
        this.topOffset = 0;
        this.leftOffset = 0;
    }

    get top() {
        return this.coords.top + this.topOffset;
    }
    set top(val) {
        return (this.coords.top = val);
    }

    get right() {
        return this.coords.right + this.leftOffset;
    }
    set right(val) {
        return (this.coords.right = val);
    }

    get bottom() {
        return this.coords.bottom + this.topOffset;
    }
    set bottom(val) {
        return (this.coords.bottom = val);
    }

    get left() {
        return this.coords.left + this.leftOffset;
    }
    set left(val) {
        return (this.coords.left = val);
    }

    get width() {
        return this.right - this.left;
    }

    get height() {
        return this.bottom - this.top;
    }

    get(prop) {
        const value = this[prop] != null ? this[prop] : this.layer[prop];
        if (typeof value === "function") {
            return value();
        } else {
            return value;
        }
    }

    visible() {
        if (this.layer.clipped && !this.clippingMask().visible()) {
            return false;
        }
        if (this.forceVisible != null) {
            return this.forceVisible;
        } else {
            return this.layer.visible;
        }
    }

    hidden() {
        return !this.visible();
    }

    isLayer() {
        return this.type === "layer";
    }

    isGroup() {
        return this.type === "group";
    }

    isRoot() {
        return this.type === "root";
    }

    clippingMask() {
        let maskNode;
        if (!this.layer.clipped) {
            return null;
        }
        return (
            this.clippingMaskCached ||
            (this.clippingMaskCached = function () {
                maskNode = this.nextSibling();
                while (maskNode.clipped) {
                    maskNode = maskNode.nextSibling();
                }
                return maskNode;
            }.call(this))
        );
    }

    clippedBy() {
        return this.clippingMask();
    }

    get(prop) {
        const value = this[prop] != null ? this[prop] : this.layer[prop];
        if (typeof value === "function") {
            return value();
        } else {
            return value;
        }
    }

    export() {
        const hash = {
            type: null,
            visible: this.visible(),
            opacity: this.layer.opacity / 255.0,
            blendingMode: this.layer.blendingMode(),
        };
        const _ref = Node.PROPERTIES;
        const _len = _ref.length;
        for (let _i = 0; _i < _len; _i++) {
            const prop = _ref[_i];
            hash[prop] = this[prop];
        }
        return hash;
    }

    updateDimensions() {
        if (this.isLayer()) {
            return;
        }
        const _ref = this._children;
        const _len = _ref.length;
        for (let _i = 0; _i < _len; _i++) {
            const child = _ref[_i];
            child.updateDimensions();
        }
        if (this.isRoot()) {
            return;
        }
        const nonEmptyChildren = this._children.filter((c) => !c.isEmpty());
        this.left = Math.min(nonEmptyChildren.map((c) => c.left)) || 0;
        this.top = Math.min(nonEmptyChildren.map((c) => c.top)) || 0;
        this.bottom = Math.max(nonEmptyChildren.map((c) => c.bottom)) || 0;
        return (this.right =
            Math.max(nonEmptyChildren.map((c) => c.right)) || 0);
    }
}

Node.includes(ancestry);
Node.includes(search);
Node.includes(buildPreview);

export default Node;
