const moduleKeywords = ["extended", "included"];

export default class Module {
    static extends(obj) {
        let _ref;
        for (let key in obj) {
            const value = obj[key];
            if ([].indexOf.call(moduleKeywords, key) < 0) {
                this[key] = value;
            }
        }
        if ((_ref = obj.extended) != null) {
            _ref.call(this, this);
        }
        return this;
    }
    static includes(obj) {
        let _ref;
        for (let key in obj) {
            const value = obj[key];
            if ([].indexOf.call(moduleKeywords, key) < 0) {
                this.prototype[key] = value;
            }
        }
        if ((_ref = obj.included) != null) {
            _ref.call(this, this);
        }
        return this;
    }
    static delegate() {
        var args, source, target, _i, _len, _results;
        args = 1 <= arguments.length ? [].slice.call(arguments, 0) : [];
        target = args.pop();
        _results = [];
        for (_i = 0, _len = args.length; _i < _len; _i++) {
            source = args[_i];
            _results.push((this.prototype[source] = target.prototype[source]));
        }
        return _results;
    }
    static aliasFunction(to, from) {
        return (this.prototype[to] = (function (_this) {
            return function () {
                var args;
                args = 1 <= arguments.length ? [].slice.call(arguments, 0) : [];
                return _this.prototype[from].apply(_this, args);
            };
        })(this));
    }
    static aliasProperty(to, from) {
        return Object.defineProperty(this.prototype, to, {
            get: function () {
                return this[from];
            },
            set: function (val) {
                return (this[from] = val);
            },
        });
    }
    static included(func) {
        return func.call(this, this.prototype);
    }
}
