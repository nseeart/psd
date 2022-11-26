(function () {
    var LAYER_INFO, LazyExecute, Util,
        __hasProp = {}.hasOwnProperty;

    LazyExecute = require('../lazy_execute.js');

    Util = require('../util.js');

    LAYER_INFO = {
        artboard: require('../layer_info/artboard.js'),
        blendClippingElements: require('../layer_info/blend_clipping_elements.js'),
        blendInteriorElements: require('../layer_info/blend_interior_elements.js'),
        fillOpacity: require('../layer_info/fill_opacity.js'),
        gradientFill: require('../layer_info/gradient_fill.js'),
        layerId: require('../layer_info/layer_id.js'),
        layerNameSource: require('../layer_info/layer_name_source.js'),
        legacyTypetool: require('../layer_info/legacy_typetool.js'),
        locked: require('../layer_info/locked.js'),
        metadata: require('../layer_info/metadata.js'),
        name: require('../layer_info/unicode_name.js'),
        nestedSectionDivider: require('../layer_info/nested_section_divider.js'),
        objectEffects: require('../layer_info/object_effects.js'),
        sectionDivider: require('../layer_info/section_divider.js'),
        solidColor: require('../layer_info/solid_color.js'),
        typeTool: require('../layer_info/typetool.js'),
        vectorMask: require('../layer_info/vector_mask.js'),
        vectorOrigination: require('../layer_info/vector_origination.js'),
        vectorStroke: require('../layer_info/vector_stroke.js'),
        vectorStrokeContent: require('../layer_info/vector_stroke_content.js')
    };

    module.exports = {
        parseLayerInfo: function () {
            var i, key, keyParseable, klass, length, name, pos, _results;
            _results = [];
            while (this.file.tell() < this.layerEnd) {
                this.file.seek(4, true);
                key = this.file.readString(4);
                length = Util.pad2(this.file.readInt());
                pos = this.file.tell();
                keyParseable = false;
                for (name in LAYER_INFO) {
                    if (!__hasProp.call(LAYER_INFO, name)) continue;
                    klass = LAYER_INFO[name];
                    if (!klass.shouldParse(key)) {
                        continue;
                    }
                    i = new klass(this, length);
                    this.adjustments[name] = new LazyExecute(i, this.file).now('skip').later('parse').get();
                    if (this[name] == null) {
                        (function (_this) {
                            return (function (name) {
                                return _this[name] = function () {
                                    return _this.adjustments[name];
                                };
                            });
                        })(this)(name);
                    }
                    this.infoKeys.push(key);
                    keyParseable = true;
                    break;
                }
                if (!keyParseable) {
                    _results.push(this.file.seek(length, true));
                } else {
                    _results.push(void 0);
                }
            }
            return _results;
        }
    };

}).call(this);