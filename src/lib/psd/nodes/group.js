import Node from "../node.js";
const _ = require("lodash");

export default class Group extends Node {
    constructor() {
        return super(...arguments);
    }

    type = "group";

    passthruBlending() {
        return this.get("blendingMode") === "passthru";
    }

    isEmpty() {
        var child;
        if (
            !function () {
                var _i, _len, _ref, _results;
                _ref = this._children;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    child = _ref[_i];
                    _results.push(child.isEmpty());
                }
                return _results;
            }.call(this)
        ) {
            return false;
        }
    }

    ["export"]() {
        return _.merge(super.export(), {
            type: "group",
            children: this._children.map(function (c) {
                return c.export();
            }),
        });
    }
}
