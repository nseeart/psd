(function () {
    var Group, Node, _,
        __extends = function (child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }

            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        },
        __hasProp = {}.hasOwnProperty;

    _ = require('lodash');

    Node = require('../node.js');

    module.exports = Group = (function (_super) {
        __extends(Group, _super);

        function Group() {
            return Group.__super__.constructor.apply(this, arguments);
        }

        Group.prototype.type = 'group';

        Group.prototype.passthruBlending = function () {
            return this.get('blendingMode') === 'passthru';
        };

        Group.prototype.isEmpty = function () {
            var child;
            if (!(function () {
                    var _i, _len, _ref, _results;
                    _ref = this._children;
                    _results = [];
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        child = _ref[_i];
                        _results.push(child.isEmpty());
                    }
                    return _results;
                }).call(this)) {
                return false;
            }
        };

        Group.prototype["export"] = function () {
            return _.merge(Group.__super__["export"].call(this), {
                type: 'group',
                children: this._children.map(function (c) {
                    return c["export"]();
                })
            });
        };

        return Group;

    })(Node);

}).call(this);