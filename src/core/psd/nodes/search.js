import { clone } from "lodash-es";

export default {
    childrenAtPath(path, opts) {
        var matches, query;
        if (opts == null) {
            opts = {};
        }
        if (!Array.isArray(path)) {
            path = path.split("/").filter(function (p) {
                return p.length > 0;
            });
        }
        path = clone(path);
        query = path.shift();
        matches = this.children().filter(function (c) {
            if (opts.caseSensitive) {
                return c.name === query;
            } else {
                return c.name.toLowerCase() === query.toLowerCase();
            }
        });
        if (path.length === 0) {
            return matches;
        } else {
            return matches
                .map((m) => m.childrenAtPath(clone(path), opts))
                .flat(Infinity);
        }
    },
};
