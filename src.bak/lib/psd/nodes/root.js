(function () {
    var Group, Layer, Node, Root, _,
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

    Group = require('./group.js');

    Layer = require('./layer.js');

    module.exports = Root = (function (_super) {
        __extends(Root, _super);

        Root.layerForPsd = function (psd) {
            var layer, prop, _i, _len, _ref;
            layer = {};
            _ref = Node.PROPERTIES;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                prop = _ref[_i];
                layer[prop] = null;
            }
            layer.top = 0;
            layer.left = 0;
            layer.right = psd.header.width;
            layer.bottom = psd.header.height;
            return layer;
        };

        Root.prototype.type = 'root';

        function Root(_at_psd) {
            this.psd = _at_psd;
            Root.__super__.constructor.call(this, Root.layerForPsd(this.psd));
            this.buildHeirarchy();
        }

        Root.prototype.documentDimensions = function () {
            return [this.width, this.height];
        };

        Root.prototype.depth = function () {
            return 0;
        };

        Root.prototype.opacity = function () {
            return 255;
        };

        Root.prototype.fillOpacity = function () {
            return 255;
        };

        Root.prototype["export"] = function () {
            var _ref;
            return {
                children: this._children.map(function (c) {
                    return c["export"]();
                }),
                document: {
                    width: this.width,
                    height: this.height,
                    resources: {
                        layerComps: ((_ref = this.psd.resources.resource('layerComps')) != null ? _ref["export"]() : void 0) || [],
                        guides: [],
                        slices: []
                    }
                }
            };
        };

        Root.prototype.buildHeirarchy = function () {
            var currentGroup, layer, parent, parseStack, _i, _len, _ref;
            currentGroup = this;
            parseStack = [];
            _ref = this.psd.layers;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                layer = _ref[_i];
                if (layer.isFolder()) {
                    parseStack.push(currentGroup);
                    currentGroup = new Group(layer, _.last(parseStack));
                } else if (layer.isFolderEnd()) {
                    parent = parseStack.pop();
                    parent.children().push(currentGroup);
                    currentGroup = parent;
                } else {
                    currentGroup.children().push(new Layer(layer, currentGroup));
                }
            }
            return this.updateDimensions();
        };

        return Root;

    })(Node);

}).call(this);