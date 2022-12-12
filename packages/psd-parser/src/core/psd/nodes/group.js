import Node from "../node";
import { merge } from "lodash-es";

export default class Group extends Node {
    constructor() {
        return super(...arguments);
    }

    type = "group";

    passthruBlending() {
        return this.get("blendingMode") === "passthru";
    }

    isEmpty() {
        if (
            !function () {
                const _ref = this._children;
                const _len = _ref.length;
                const _results = [];
                for (let _i = 0; _i < _len; _i++) {
                    const child = _ref[_i];
                    _results.push(child.isEmpty());
                }
                return _results;
            }.call(this)
        ) {
            return false;
        }
    }

    export() {
        return merge(super.export(), {
            type: "group",
            children: this._children.map((c) => c.export()),
        });
    }
}
