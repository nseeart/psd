import { includes } from "./util";
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
        this.createProperties();
    }

    createProperties() {
        Object.defineProperty(this, "top", {
            get: function () {
                return this.coords.top + this.topOffset;
            },
            set: function (val) {
                return (this.coords.top = val);
            },
        });
        Object.defineProperty(this, "right", {
            get: function () {
                return this.coords.right + this.leftOffset;
            },
            set: function (val) {
                return (this.coords.right = val);
            },
        });
        Object.defineProperty(this, "bottom", {
            get: function () {
                return this.coords.bottom + this.topOffset;
            },
            set: function (val) {
                return (this.coords.bottom = val);
            },
        });
        Object.defineProperty(this, "left", {
            get: function () {
                return this.coords.left + this.leftOffset;
            },
            set: function (val) {
                return (this.coords.left = val);
            },
        });
        Object.defineProperty(this, "width", {
            get: function () {
                return this.right - this.left;
            },
        });
        return Object.defineProperty(this, "height", {
            get: function () {
                return this.bottom - this.top;
            },
        });
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
        var child, nonEmptyChildren, _i, _len, _ref;
        if (this.isLayer()) {
            return;
        }
        _ref = this._children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            child.updateDimensions();
        }
        if (this.isRoot()) {
            return;
        }
        nonEmptyChildren = this._children.filter(function (c) {
            return !c.isEmpty();
        });
        this.left =
            Math.min(
                nonEmptyChildren.map(function (c) {
                    return c.left;
                })
            ) || 0;
        this.top =
            Math.min(
                nonEmptyChildren.map(function (c) {
                    return c.top;
                })
            ) || 0;
        this.bottom =
            Math.max(
                nonEmptyChildren.map(function (c) {
                    return c.bottom;
                })
            ) || 0;
        return (this.right =
            Math.max(
                nonEmptyChildren.map(function (c) {
                    return c.right;
                })
            ) || 0);
    }
}

// Node.prototype.updateDimensions = function () {
//     var child, nonEmptyChildren, _i, _len, _ref;
//     if (this.isLayer()) {
//         return;
//     }
//     _ref = this._children;
//     for (_i = 0, _len = _ref.length; _i < _len; _i++) {
//         child = _ref[_i];
//         child.updateDimensions();
//     }
//     if (this.isRoot()) {
//         return;
//     }
//     nonEmptyChildren = this._children.filter(function (c) {
//         return !c.isEmpty();
//     });
//     this.left =
//         _.min(
//             nonEmptyChildren.map(function (c) {
//                 return c.left;
//             })
//         ) || 0;
//     this.top =
//         _.min(
//             nonEmptyChildren.map(function (c) {
//                 return c.top;
//             })
//         ) || 0;
//     this.bottom =
//         _.max(
//             nonEmptyChildren.map(function (c) {
//                 return c.bottom;
//             })
//         ) || 0;
//     return (this.right =
//         _.max(
//             nonEmptyChildren.map(function (c) {
//                 return c.right;
//             })
//         ) || 0);
// };

Node.includes(ancestry);
Node.includes(search);
Node.includes(buildPreview);

export default Node;
