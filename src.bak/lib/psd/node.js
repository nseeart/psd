(function () {
    var Module, Node, _,
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

    Module = require('coffeescript-module').Module;

    module.exports = Node = (function (_super) {
        __extends(Node, _super);

        Node.includes(require('./nodes/ancestry.js'));

        Node.includes(require('./nodes/search.js'));

        Node.includes(require('./nodes/build_preview.js'));

        Node.PROPERTIES = ['name', 'left', 'right', 'top', 'bottom', 'height', 'width'];

        Node.prototype.type = 'node';

        function Node(_at_layer, _at_parent) {
            this.layer = _at_layer;
            this.parent = _at_parent != null ? _at_parent : null;
            this.layer.node = this;
            this._children = [];
            this.name = this.layer.name;
            this.forceVisible = null;
            this.coords = {
                top: this.layer.top,
                bottom: this.layer.bottom,
                left: this.layer.left,
                right: this.layer.right
            };
            this.topOffset = 0;
            this.leftOffset = 0;
            this.createProperties();
        }

        Node.prototype.createProperties = function () {
            Object.defineProperty(this, 'top', {
                get: function () {
                    return this.coords.top + this.topOffset;
                },
                set: function (val) {
                    return this.coords.top = val;
                }
            });
            Object.defineProperty(this, 'right', {
                get: function () {
                    return this.coords.right + this.leftOffset;
                },
                set: function (val) {
                    return this.coords.right = val;
                }
            });
            Object.defineProperty(this, 'bottom', {
                get: function () {
                    return this.coords.bottom + this.topOffset;
                },
                set: function (val) {
                    return this.coords.bottom = val;
                }
            });
            Object.defineProperty(this, 'left', {
                get: function () {
                    return this.coords.left + this.leftOffset;
                },
                set: function (val) {
                    return this.coords.left = val;
                }
            });
            Object.defineProperty(this, 'width', {
                get: function () {
                    return this.right - this.left;
                }
            });
            return Object.defineProperty(this, 'height', {
                get: function () {
                    return this.bottom - this.top;
                }
            });
        };

        Node.prototype.get = function (prop) {
            var value;
            value = this[prop] != null ? this[prop] : this.layer[prop];
            if (typeof value === 'function') {
                return value();
            } else {
                return value;
            }
        };

        Node.prototype.visible = function () {
            if (this.layer.clipped && !this.clippingMask().visible()) {
                return false;
            }
            if (this.forceVisible != null) {
                return this.forceVisible;
            } else {
                return this.layer.visible;
            }
        };

        Node.prototype.hidden = function () {
            return !this.visible();
        };

        Node.prototype.isLayer = function () {
            return this.type === 'layer';
        };

        Node.prototype.isGroup = function () {
            return this.type === 'group';
        };

        Node.prototype.isRoot = function () {
            return this.type === 'root';
        };

        Node.prototype.clippingMask = function () {
            var maskNode;
            if (!this.layer.clipped) {
                return null;
            }
            return this.clippingMaskCached || (this.clippingMaskCached = ((function () {
                    maskNode = this.nextSibling();
                    while (maskNode.clipped) {
                        maskNode = maskNode.nextSibling();
                    }
                    return maskNode;
                }).call(this)));
        };

        Node.prototype.clippedBy = function () {
            return this.clippingMask();
        };

        Node.prototype["export"] = function () {
            var hash, prop, _i, _len, _ref;
            hash = {
                type: null,
                visible: this.visible(),
                opacity: this.layer.opacity / 255.0,
                blendingMode: this.layer.blendingMode()
            };
            _ref = Node.PROPERTIES;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                prop = _ref[_i];
                hash[prop] = this[prop];
            }
            return hash;
        };

        Node.prototype.updateDimensions = function () {
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
            this.left = _.min(nonEmptyChildren.map(function (c) {
                    return c.left;
                })) || 0;
            this.top = _.min(nonEmptyChildren.map(function (c) {
                    return c.top;
                })) || 0;
            this.bottom = _.max(nonEmptyChildren.map(function (c) {
                    return c.bottom;
                })) || 0;
            return this.right = _.max(nonEmptyChildren.map(function (c) {
                    return c.right;
                })) || 0;
        };

        return Node;

    })(Module);

}).call(this);