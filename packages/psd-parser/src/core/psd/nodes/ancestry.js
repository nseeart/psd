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
        if (this.parent == null) {
            return null;
        }
        const index = this.siblings().indexOf(this);
        return this.siblings()[index + 1];
    },
    prevSibling() {
        if (this.parent == null) {
            return null;
        }
        const index = this.siblings().indexOf(this);
        return this.siblings()[index - 1];
    },
    hasSiblings() {
        return this.siblings().length > 1;
    },
    onlyChild() {
        return !this.hasSiblings();
    },
    descendants() {
        return this._children.map((n) => n.subtree()).flat(Infinity);
    },
    subtree() {
        return [this].concat(this.descendants());
    },
    depth() {
        return this.ancestors().length + 1;
    },
    path(asArray = false) {
        const path = this.ancestors()
            .map((n) => n.name)
            .concat([this.name]);
        if (asArray) {
            return path;
        } else {
            return path.join("/");
        }
    },
};
