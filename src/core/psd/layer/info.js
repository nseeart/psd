import artboard from "../layer_info/artboard";
import blendClippingElements from "../layer_info/blend_clipping_elements";
import blendInteriorElements from "../layer_info/blend_interior_elements";
import fillOpacity from "../layer_info/fill_opacity";
import gradientFill from "../layer_info/gradient_fill";
import layerId from "../layer_info/layer_id";
import layerNameSource from "../layer_info/layer_name_source";
import legacyTypetool from "../layer_info/legacy_typetool";
import locked from "../layer_info/locked";
import metadata from "../layer_info/metadata";
import name from "../layer_info/unicode_name";
import nestedSectionDivider from "../layer_info/nested_section_divider";
import objectEffects from "../layer_info/object_effects";
import sectionDivider from "../layer_info/section_divider";
import solidColor from "../layer_info/solid_color";
import typeTool from "../layer_info/typetool";
import vectorMask from "../layer_info/vector_mask";
import vectorOrigination from "../layer_info/vector_origination";
import vectorStroke from "../layer_info/vector_stroke";
import vectorStrokeContent from "../layer_info/vector_stroke_content";

import { pad2 } from "../util2";
import LazyExecute from "../lazy_execute";

const LAYER_INFO = {
    artboard,
    blendClippingElements,
    blendInteriorElements,
    fillOpacity,
    gradientFill,
    layerId,
    layerNameSource,
    legacyTypetool,
    locked,
    metadata,
    name,
    nestedSectionDivider,
    objectEffects,
    sectionDivider,
    solidColor,
    typeTool,
    vectorMask,
    vectorOrigination,
    vectorStroke,
    vectorStrokeContent,
};

export default {
    parseLayerInfo() {
        let keyParseable;
        const _results = [];
        while (this.file.tell() < this.layerEnd) {
            // 签名：“8BIM”或“8B64”
            this.file.seek(4, true);
            // 密钥：4 个字符的代码（请参阅各个部分）
            const key = this.file.readString(4);
            // console.log("parseLayerInfo key:", key);
            // 下面的长度数据，四舍五入为偶数字节数。
            const length = pad2(this.file.readInt());
            const pos = this.file.tell();
            keyParseable = false;
            for (let name in LAYER_INFO) {
                if (!Object.hasOwnProperty.call(LAYER_INFO, name)) continue;
                const klass = LAYER_INFO[name];
                if (!klass.shouldParse(key)) {
                    continue;
                }
                const i = new klass(this, length);
                // console.log("i", i);
                this.adjustments[name] = new LazyExecute(i, this.file)
                    .now("skip")
                    .later("parse")
                    .get();
                if (this[name] == null) {
                    (function (_this) {
                        return function (name) {
                            return (_this[name] = function () {
                                return _this.adjustments[name];
                            });
                        };
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
    },
};
