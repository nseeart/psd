(function () {
    var Artboard, Descriptor, LayerInfo,
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

    LayerInfo = require('../layer_info.js');

    Descriptor = require('../descriptor.js');

    module.exports = Artboard = (function (_super) {
        __extends(Artboard, _super);

        function Artboard() {
            return Artboard.__super__.constructor.apply(this, arguments);
        }

        Artboard.shouldParse = function (key) {
            return key === 'artb';
        };

        Artboard.prototype.parse = function () {
            this.file.seek(4, true);
            return this.data = new Descriptor(this.file).parse();
        };

        Artboard.prototype["export"] = function () {
            return {
                coords: {
                    left: this.data.artboardRect['Left'],
                    top: this.data.artboardRect['Top '],
                    right: this.data.artboardRect['Rght'],
                    bottom: this.data.artboardRect['Btom']
                }
            };
        };

        return Artboard;

    })(LayerInfo);

}).call(this);