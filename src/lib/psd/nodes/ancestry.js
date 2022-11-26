const _ = require("lodash");

export default {
    root() {
        if (this.isRoot()) {
            return this;
        }
        return this.parent.root();
    },
    isRoot() {
        return this.depth() === 0;
    },
    children() {
        return this._children;
    },
    ancestors() {
        if (this.parent == null || this.parent.isRoot()) {
            return [];
        }
        return this.parent.ancestors().concat([this.parent]);
    },
    hasChildren() {
        return this._children.length > 0;
    },
    childless() {
        return !this.hasChildren();
    },
    siblings() {
        if (this.parent == null) {
            return [];
        }
        return this.parent.children();
    },
    nextSibling() {
        var index;
        if (this.parent == null) {
            return null;
        }
        index = this.siblings().indexOf(this);
        return this.siblings()[index + 1];
    },
    prevSibling() {
        var index;
        if (this.parent == null) {
            return null;
        }
        index = this.siblings().indexOf(this);
        return this.siblings()[index - 1];
    },
    hasSiblings() {
        return this.siblings().length > 1;
    },
    onlyChild() {
        return !this.hasSiblings();
    },
    descendants() {
        return _.flatten(
            this._children.map(function (n) {
                return n.subtree();
            })
        );
    },
    subtree() {
        return [this].concat(this.descendants());
    },
    depth() {
        return this.ancestors().length + 1;
    },
    path(asArray) {
        var path;
        if (asArray == null) {
            asArray = false;
        }
        path = this.ancestors()
            .map(function (n) {
                return n.name;
            })
            .concat([this.name]);
        if (asArray) {
            return path;
        } else {
            return path.join("/");
        }
    },
};
